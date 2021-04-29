const Image = require("../models/Image");
const fs = require("fs");
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
const removeUserImage = async (req, res, next) => {
  try {
    const image = await Image.findById(req.params.id);
    if (image.user.toString() !== req.user._id.toString()) {
      throw new Error("this is not your image");
    }
    // remove from server
    fs.unlinkSync(image.imagePath);
    // remove from database
    await Image.findOneAndRemove({ _id: req.params.id });
    res.send({ message: "image removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllImages, getUserImage, removeUserImage };
