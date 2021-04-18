const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://AmrNashaat:Aa0235472091@cluster0.obvn1.mongodb.net/gallery?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("connected to Database"))
  .catch((err) => console.log(err));
