const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello from Coffee Shop Sim API');
});

/*
    API Description:
    Key field called 'curr' used for setting results range.
    Number of customers out cannot be greater than 'curr'.
    Number of customer in will vary with time of day.
*/
app.get('/api/customer-io', (req, res) => {
  let currentPop = req.query.curr;

  res.send(data);
});

app.listen(port, () =>
  console.log(`CoffeeShopSimAPI listening on port ${port}...`)
);
