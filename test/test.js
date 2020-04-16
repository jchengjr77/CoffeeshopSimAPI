const request = require("supertest");
const assert = require("assert");

describe("loading express", () => {
  let server;
  before(() => {
    server = require("../src/index");
  });
  after(done => {
    server.close(done);
  });

  // ? NOTE: Only _one_ server instance for all tests right now.
  // ?      If this needs to be changed, it can.

  it("responds to /", done => {
    request(server)
      .get("/api")
      .expect(200, done);
  });
  it("404 bad requests", done => {
    request(server)
      .get("/bad/request")
      .expect(404);
    request(server)
      .get("/api/customer-bad-api")
      .expect(404, done);
  });
  it("good request (no timezone)", done => {
    request(server)
      .get("/api/customer-io?curr=6&max=10")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
  it("good request (timezone)", done => {
    request(server)
      .get("/api/customer-io?curr=6&max=10&timezone=EDT")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(function(res) {
        console.log(JSON.stringify(res.body, null, 2));
      })
      .expect(200, done);
  });
  it("good request (bad timezone)", done => {
    request(server)
      .get("/api/customer-io?curr=0&max=10&timezone=oopsies")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400, done);
  });
  it("request missing max", done => {
    request(server)
      .get("/api/customer-io?curr=0")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400, done);
  });
  it("request missing curr", done => {
    request(server)
      .get("/api/customer-io?max=10")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400, done);
  });
});

describe("testing util files", () => {
  let util;
  let posBias;
  let neutralBias;
  let negBias;
  before(() => {
    util = require("../src/util");
    posBias = 0;
    neutralBias = 0;
    negBias = 0;
    for (var i = 0; i < 99999; i++) {
      posBias += util.biasedRandom(0, 100000, 1);
      neutralBias += util.biasedRandom(0, 100000, 0);
      negBias += util.biasedRandom(0, 100000, -1);
    }
    posBias /= 99999;
    neutralBias /= 99999;
    negBias /= 99999;
  });
  it("tests that positive bias averages more than neutral or negative", done => {
    assert.equal(posBias > neutralBias, true);
    assert.equal(posBias > negBias, true);
    done();
  });
  it("tests that neutral bias averages more than negative", done => {
    assert.equal(neutralBias > negBias, true);
    done();
  });
  it("tests that a given hour gives the right time group", done => {
    assert.equal(util.timeGroup(0), -2);
    assert.equal(util.timeGroup(8), 0);
    assert.equal(util.timeGroup(9), 1);
    assert.equal(util.timeGroup(13), 1);
    assert.equal(util.timeGroup(17), -1);
    assert.equal(util.timeGroup(22), -2);
    done();
  });
});
