const express = require("express");
const multerConfig = require("../utilities/multerConfig");
const { userSignup, userLogin, uploadImage } = require("../controllers/user");
const auth = require("../middlewares/auth");

const uploadProfiles = multerConfig("profiles");
const uploadUserImages = multerConfig("userUploads");
// user router
const router = express.Router();
router.post("/signup", uploadProfiles.single("avatar"), userSignup);
router.post("/login", userLogin);
// upload photo route for authenticated users
router.put("/upload", auth, uploadUserImages.single("upload"), uploadImage);
module.exports = router;
