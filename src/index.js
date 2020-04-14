const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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
  res.json({
    message: 'Hello from Coffee Shop Sim API',
  });
});

/*
    API Description:
    Key field called 'curr' used for setting results range.
    Number of customers out cannot be greater than 'curr'.
    Number of customer in will vary with time of day.
*/
router.get('/customer-io', (req, res) => {
  let currentPop = req.query.curr;
  // Need to do some error checking here
  let data = {
    in: 5,
    out: 3,
  };
  res.send(data);
});

/*
 * __________ End of Routes _________
 */

// * Register routes
app.use('/api', router);

// * Start server
app.listen(port, () =>
  console.log(`CoffeeShopSimAPI listening on port ${port}...`)
);
