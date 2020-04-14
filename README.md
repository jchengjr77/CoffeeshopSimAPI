# CoffeeShop Sim. API

**Built to test [Vacanti](https://github.com/CMU-17-356/Vacanti).**



Basic API for Vacanti's Shop-facing backend to interact with.

Simply returns the number of customers going in and out of the shop.



## Features/Details

Customer traffic numbers are randomized to a degree. Each request will get different results.

Constraints:

- Customers going out cannot be greater than current number of customers.
- Traffic should vary with the time of day. More specifically, requests made during breakfast/lunch hours will result in greater numbers going in and out (since these are busier hours). Requests made outside of peak hours will have lower traffic.

- Deployed to Heroku (see URLs in the usage section below)

## Usage

The API has two endpoints. The most basic one is:

```http
GET https://coffeeshopsimapi.herokuapp.com/api
```

All this will do is respond with a greeting message, indicating that you are indeed hitting the API.

The more useful endpoint is:

```http
GET https://coffeeshopsimapi.herokuapp.com/api/customer-io?curr=123
```

Where `curr` is a parameter the shop will pass to the API, indicating the current number of customers in the shop. This is important for the API to calibrate its traffic numbers, as there cannot be more customers exiting the shop than there currently are customers in the shop.