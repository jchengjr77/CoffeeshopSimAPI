const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const util = require("./util");
const timezones = require("./timezones.json");

const port = process.env.PORT || 5000;

// Configure app to use bodyParser().
// This will let us get data from a POST request.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Instance of the express router
const router = express.Router();

/*
 * __________ API Routes __________
 */
router.get("/", (req, res) => {
  let data = {
    message: "Hello from Coffee Shop Sim API"
  };
  res.status(200).send(data);
});

/*
    API Description:
    Key field called 'curr' used for setting results range.
    Number of customers out cannot be greater than 'curr'.
    Number of customer in will vary with time of day.
*/
router.get("/customer-io", (req, res) => {
  var tooFull = false;
  var UTCOffset;
  var currHour = new Date().getHours();
  if (req.query.max == null || req.query.curr == null) {
    res.status(400).send({});
    return;
  }
  if (req.query.timezone != null) {
    let timezone = req.query.timezone;
    console.log(req.query.timezone)
    if (timezones[timezone] == null) {
      res.status(400).send({}); // Unssuported timezone
      return;
    } else {
      UTCOffset = timezones[timezone].UTCOffset;
    }
  } else {
    UTCOffset = timezones.EST.UTCOffset; // Default use EST
  }
  let storeMax = req.query.max;
  let currentPop = req.query.curr;
  if (currentPop >= Math.floor(0.9 * storeMax)) {
    tooFull = true;
  }

  timeGroup = util.timeGroup(currHour);

  // Need to do some error checking here
  let data = {
    in: 5,
    out: 3
  };
  res.status(200).send(data);
});

/*
 * __________ End of Routes _________
 */

// * Register routes
app.use("/api", router);

// * Start server
var server = app.listen(port, () =>
  console.log(`CoffeeShopSimAPI listening on port ${port}...`)
);

// * Export server (good for testing)
module.exports = server;