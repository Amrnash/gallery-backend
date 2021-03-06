const express = require("express");
const path = require("path");
const userRoutes = require("./routes/user");
const imageRoutes = require("./routes/image");
const app = express();
const morgan = require("morgan");

const cors = require("cors");
require("./config/db");
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads/")));
app.use("/api/user", userRoutes);
app.use("/api/image", imageRoutes);
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
app.listen(7000, () => {
  console.log("server is running on 7000");
});
