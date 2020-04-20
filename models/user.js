const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    encryptedPassword: {
      type: String,
      required: true,
    },

    salt: {
      type: String,
    },

    role: {
      type: Number,
      required: true,
      default: 0,
    },

    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encryptedPassword = this.hashPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  hashPassword: function (plainPassword) {
    if (!plainPassword) return "";

    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (err) {
      console.log(err);
      return "";
    }
  },

  comparePassword: function (receivedPassword) {
    try {
      return this.hashPassword(receivedPassword) === this.encryptedPassword;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};

const User = mongoose.model("User", userSchema);

module.exports = User;
