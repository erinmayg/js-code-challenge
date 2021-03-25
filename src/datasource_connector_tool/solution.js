// Problem 2
// Task: Implement a datasource connector to abstract away data retrieval and manipulation from the `ViewControllers`.
// Your solution shall use only [Vanilla JavaScript](http://vanilla-js.com).
const fetch = require('node-fetch');

class Datasource {
  constructor() {
    this.source = 'https://static.ngnrs.io/test/prices';
  }

  getPrices() {
    return fetch(this.source)
      .then((response) => response.json())
      .then((data) => {
        let prices = data['data']['prices'].map(
          (price) => new Price(price['buy'], price['sell'], price['pair'])
        );
        return prices;
      });
  }
}

class Price {
  constructor(buy, sell, pair) {
    this.buy = buy;
    this.sell = sell;
    this.pair = pair;
  }

  mid() {
    return (this.buy + this.sell) / 200;
  }

  quote() {
    return this.pair.substring(3);
  }
}

let ds = new Datasource();
ds.getPrices()
  .then((prices) => {
    prices.forEach((price) => {
      console.log(
        `Mid price for ${price.pair} is ${price.mid()} ${price.quote()}.`
      );
    });
  })
  .catch((error) => {
    console.err(error);
  });
