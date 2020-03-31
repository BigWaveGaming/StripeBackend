const express = require('express')
const app = express()
const port = 3000

//app.get('/', (req, res) => res.send('Hello World!'))

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const stripe = require('stripe')('sk_test_2wbg3UwVaK3bwnnMwZGAtlJg00TEY10OpD');

app.post('/api/doPayment/', (req, res) => {
  return stripe.charges
    .create({
      amount: req.body.amount, // Unit: cents
      currency: 'usd',
      source: req.body.tokenId,
      description: 'Test payment',
    })
    .then(result => res.status(200).json(result));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
