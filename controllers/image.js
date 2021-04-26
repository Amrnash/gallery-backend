const Image = require("../models/Image");
const getAllImages = async (req, res, next) => {
  try {
    const limit = req.query.limit;
    const skip = req.query.skip;
    const images = await Image.find({})
      .limit(limit)
      .skip(skip)
      .sort({ created: -1 });
    res.send(images);
  } catch (error) {
    next(error);
  }
};
const getUserImage = async (req, res, next) => {
  try {
    const images = await Image.find({ user: req.user._id });
    res.send(images);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllImages, getUserImage };
