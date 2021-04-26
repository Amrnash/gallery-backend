const mongoose = require("mongoose");
const imageSchema = mongoose.Schema({
  imagePath: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  created: { type: Date, default: Date.now() },
});
const image = mongoose.model("Image", imageSchema);
module.exports = image;
