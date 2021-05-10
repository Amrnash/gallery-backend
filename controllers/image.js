const Image = require("../models/Image");
const fs = require("fs");
const getAllImages = async (req, res, next) => {
  try {
    // default page size
    const pageSize = 10;
    // the current page we are on
    const page = Number(req.query.pageNumber) || 1;
    // the total number of image documents in DB
    const count = await Image.countDocuments();
    // query the DB for images
    const images = await Image.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ created: -1 });
    // send the images along with current page and total number of pages
    res.json({ images, page, pages: Math.ceil(count / pageSize) });
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
const downloadImage = async (req, res, next) => {
  try {
    const imageDoc = await Image.findById(req.params.id);
    const imagePath = imageDoc.imagePath;
    res.set({
      "Content-Type": "image/jpeg",
    });
    res.sendFile(imagePath);
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

module.exports = { getAllImages, getUserImage, removeUserImage, downloadImage };
