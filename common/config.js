const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/../.env" });

module.exports = {
  PORT: parseInt(process.env.PORT),
  MONGOURI: process.env.MONGOURI,
  secret: process.env.SECRET,
  HOST: process.env.HOST,
  STRIPE_KEY: process.env.STRIPE_KEY,
};
