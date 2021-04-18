const User = require("../models/User");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // check if email exists
    const emailExists = (await User.findOne({ email })) ? true : false;
    if (emailExists) {
      throw new Error("Email already exists");
    }
    const avatar = fs.readFileSync(req.file.path);
    const user = await User.create({ name, email, password, avatar });
    const token = jwt.sign({ id: user._id }, "mysecret", { expiresIn: "30d" });
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400);
    next(err);
  }
};
const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(email, password);
    if (user) {
      const token = jwt.sign({ id: user._id }, "mysecret", {
        expiresIn: "30d",
      });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("invalid email or password");
      res.send({ user, token });
    } else {
      throw new Error("invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};
const uploadImage = async (req, res, next) => {
  try {
    await User.updateOne(
      { _id: req.user._id },
      { $push: { images: [req.file.path] } }
    );
  } catch (error) {
    next(error);
  }
};
module.exports = {
  userSignup,
  userLogin,
  uploadImage,
};
