const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { getAllImages, getUserImage } = require("../controllers/image");
// fetch all images
router.get("/", getAllImages);
router.get("/user-images", auth, getUserImage);
module.exports = router;
