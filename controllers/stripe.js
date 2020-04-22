const { STRIPE_KEY } = require("../common/config");
const stripe = require("stripe")(STRIPE_KEY);
const uuid = require("uuid/v4");

module.exports = {
  makePayment: async (req, res) => {
    try {
      const { token, amount } = req.body;
      const idempotencyKey = uuid();
      console.log(token);
      return stripe.customers
        .create({ email: token.email, source: token.id })
        .then((customer) => {
          stripe.charges
            .create(
              {
                amount,
                currency: "usd",
                customer: customer.id,
                description: "Payment Successfull!",
                shipping: {
                  name: token.card.name,
                  address: {
                    line1: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip,
                  },
                },
              },
              { idempotencyKey }
            )
            .then((result) => res.status(200).json(result))
            .catch((err) =>
              res.status(400).json({ error: "Payment Failed!!" })
            );
        });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "Payment Failed!!" });
    }
  },
};
