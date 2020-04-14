const request = require('supertest');

describe('loading express', () => {
  let server;
  before(() => {
    server = require('../src/index');
  });
  after((done) => {
    server.close(done);
  });

  // ? NOTE: Only _one_ server instance for all tests right now.
  // ?      If this needs to be changed, it can.

  it('responds to /', (done) => {
    request(server).get('/api').expect(200, done);
  });
  it('404 bad requests', (done) => {
    request(server).get('/bad/request').expect(404);
    request(server).get('/api/customer-bad-api').expect(404, done);
  });
});
