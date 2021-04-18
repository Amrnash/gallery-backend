const express = require("express");
const userRoutes = require("./routes/user");
const app = express();
const User = require("./models/User");
const cors = require("cors");
require("./config/db");
app.use(express.json());
app.use(cors());
app.use("/api/user", userRoutes);
app.get("/", async (req, res) => {
  const user = await User.findOne({ email: "amrnashaat4@gmail.com" });
  res.send(user);
});
app.use((err, req, res) => {
  res.status(500);
  throw new Error(err);
});
app.listen(7000, () => {
  console.log("server is running on 5000");
});
