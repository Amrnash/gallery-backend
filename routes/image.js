const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  getAllImages,
  getUserImage,
  removeUserImage,
} = require("../controllers/image");
// fetch all images
router.get("/", getAllImages);
router.get("/user-images", auth, getUserImage);
router.delete("/remove/:id", auth, removeUserImage);
module.exports = router;
