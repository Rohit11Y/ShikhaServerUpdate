const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://virajkaleworkholic:virajkaleworkholicgmailcom@cluster0.jag9pvj.mongodb.net/shikha"
  )
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });
