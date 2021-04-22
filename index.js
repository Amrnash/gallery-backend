const express = require("express");
const path = require("path");
const userRoutes = require("./routes/user");
const app = express();
const User = require("./models/User");
const cors = require("cors");
require("./config/db");
app.use(express.json());
app.use(cors());
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads/userUploads"))
);
app.use("/api/user", userRoutes);
app.use((err, req, res, next) => {
  res.status(500);
  throw new Error(err);
});
app.listen(7000, () => {
  console.log("server is running on 7000");
});
