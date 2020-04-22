const stripe = require("stripe")("SECRET_KEY");
const uuid = require("uuid/v4");

module.exports = {
  makePayment: async (req, res) => {
    try {
      const { token, amount } = req.body;
      const idempotencyKey = uuid();

      return stripe.customers
        .create({ email: token.email, source: token.id })
        .then((customer) => {
          stripe.charges
            .create(
              { amount, currency: "usd", customer: customer.id },
              { idempotencyKey }
            )
            .then((result) => res.status(200).json(result))
            .catch((err) =>
              res.status(400).json({ error: "Payment Failed!!" })
            );
        });
    } catch (err) {
      res.status(400).json({ error: "Payment Failed!!" });
    }
  },
};
