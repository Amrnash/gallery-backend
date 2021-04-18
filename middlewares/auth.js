const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.header.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "mysecret");
      req.user = await User.findById(decoded.id);
      next();
    }
  } catch (error) {
    res.status(401);
    next(error);
  }
};
module.exports = auth;
