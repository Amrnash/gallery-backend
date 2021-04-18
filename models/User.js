const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator").default;
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate: function (name) {
        return validator.isLength(name, { min: 3, max: 16 });
      },
    },
    email: {
      type: String,
      required: true,
      validate: function (email) {
        return validator.isEmail(email);
      },
    },
    password: {
      type: String,
      required: true,
      validate: function (pass) {
        return validator.isLength(pass, { min: 4, max: 16 });
      },
    },
    bio: {
      type: String,
    },
    images: [{ type: String }],
    avatar: {
      type: Buffer,
    },
  },
  { timestamp: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});
const user = mongoose.model("User", userSchema);
module.exports = user;
