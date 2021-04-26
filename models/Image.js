const mongoose = require("mongoose");
const imageSchema = mongoose.Schema({
  imagePath: { type: String },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  created: { type: Date, default: Date.now() },
});
const Image = mongoose.model(imageSchema, "Image");
module.exports = Image;
