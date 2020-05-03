const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const util = require('./util');
const timezones = require('./timezones.json');

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
router.get('/', (req, res) => {
  let data = {
    message: 'Hello from Coffee Shop Sim API'
  };
  res.status(200).send(data);
});

/*
    API Description:
    Key field called 'curr' used for setting results range.
    Number of customers out cannot be greater than 'curr'.
    Number of customer in will vary with time of day.
*/
router.get('/customer-io', (req, res) => {
  var tooFull = false;
  let UTCOffset;
  var currHour = new Date().getUTCHours();

  if (req.query.max == null) {
    res.status(400).send('Missing max occupancy');
    return;
  }
  if (req.query.curr == null) {
    res.status(400).send('Missing current occupancy');
    return;
  }

  if (req.query.timezone != null) {
    let timezone = req.query.timezone;
    if (timezones[timezone] == null) {
      res.status(400).send('Invalid Timezone'); // Unssuported timezone
      return;
    } else {
      UTCOffset = timezones[timezone].UTCOffset;
    }
  } else {
    UTCOffset = timezones.EST.UTCOffset; // Default use EST
  }

  currHour += UTCOffset % 24;
  if (currHour < 0) {
    currHour += 24;
  }

  timeGroup = util.timeGroup(currHour);

  let storeMax = req.query.max;
  let currentPop = req.query.curr;
  if (currentPop >= Math.floor(0.95 * storeMax)) {
    tooFull = true;
  }
  var enteringStore = 0;
  var leavingStore = 0;

  // Compute number of people entering the store
  if (!tooFull) {
    if (timeGroup == -2) {
      enteringStore = 0;
    } else {
      var amtComing = Math.floor(Math.random() * 8);
      enteringStore = util.biasedRandom(0, amtComing, timeGroup);
    }
  } else {
    // Fixed low amount coming
    // Simulates few people coming because store is full
    enteringStore = util.biasedRandom(2, -1);
  }

  // Computer number of people leaving the store
  if (!tooFull) {
    if (timeGroup == -2) {
      leavingStore = req.query.curr;
    } else {
      // -timeGroup because more people staying and working in the evenings,
      // more people just stopping by during the day
      leavingStore = util.biasedRandom(0, req.query.curr, -timeGroup);
    }
  } else {
    // Fixed high amount leaving
    leavingStore = util.biasedRandom(req.query.curr, 1);
  }

  // Need to do some error checking here
  let data = {
    in: enteringStore,
    out: leavingStore
  };
  res.status(200).send(data);
});

/*
 * __________ End of Routes _________
 */

// * Register routes
app.use('/api', router);

// * Start server
var server = app.listen(port, () =>
  console.log(`CoffeeShopSimAPI listening on port ${port}...`)
);

// * Export server (good for testing)
module.exports = server;
