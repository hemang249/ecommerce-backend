const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/../.env" });

module.exports = {
  PORT: parseInt(process.env.PORT),
  MONGOURI: process.env.MONGOURI,
};
