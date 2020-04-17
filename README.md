# CoffeeShop Sim. API

[![CoffeeshopSimAPI](https://circleci.com/gh/jchengjr77/CoffeeshopSimAPI.svg?style=svg)](https://app.circleci.com/pipelines/github/jchengjr77/CoffeeshopSimAPI)

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
GET https://coffeeshopsimapi.herokuapp.com/api/customer-io?curr=123&max=456
```

And optionally specifying a timezone:

```http
GET https://coffeeshopsimapi.herokuapp.com/api/customer-io?curr=123&max=456&timezone=ADT
```

# Parameters:

  - `curr` (number): a parameter the shop will pass to the API, indicates the current number of customers in the shop. 
    - This is important for the API to calibrate its traffic numbers, as there cannot be more customers exiting the shop than there currently are customers in the shop.
  - `max` (number): a parameter the shop will pass to the API, indicates the maximum number of people the shop can comfortably accomodate.
    - This is important for the API to calibrate its traffic numbers, as there cannot be more customers exiting the shop than there currently are customers in the shop.
  - `timezone` (string) [optional]: a parameter the shop can pass to the API, indicates the timezone that the shop resides in
    - The following timezones are supported, passed by abbreviation:

| Abbr | UTC Offset | Name                   |
| ---- | :--------- | :--------------------- |
| PDT  | -7         | Pacific Daylight Time  |
| PST  | -8         | Pacific Standard Time  |
| MDT  | -6         | Mountain Daylight Time |
| CDT  | -5         | Central Daylight Time  |
| CST  | -6         | Central Standard Time  |
| EDT  | -5         | Eastern Daylight Time  |
| EST  | -4         | Eastern Standard Time  |
| ADT  | -8         | Alaska Daylight Time   |
| AST  | -9         | Alaska Standard Time   |
| HDT  | -9         | Hawaii Daylight Time   |
| HST  | -10        | Hawaii Standard Time   |


 

