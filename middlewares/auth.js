const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = async (req, res, next) => {
  console.log(req.headers.authorization);
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "mysecret");
      const user = await User.findById(decoded.id);
      if (!user) {
        throw new Error("invalid token");
      }
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(401);
    next(error);
  }
};
module.exports = auth;
