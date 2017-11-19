const router = require('express').Router()
const keyPublishable = process.env.PUBLISHABLE_KEY
const keySecret = process.env.SECRET_KEY
const stripe = require('stripe')(keySecret)

module.exports = router

router.get('/', (req, res, next) => res.render('index.pug', { keyPublishable }))

router.post('/', (req, res, next) => {
  console.log(req.body)
  let amount = 500

  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: 'Sample Charge',
        currency: 'usd',
        customer: customer.id
      })
    )
    .then(charge => {
      console.log(charge)
      res.send(charge)
    })
    .catch(next)
  // .then(charge => res.render('charge.pug'))
})
