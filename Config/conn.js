const mongoose = require("mongoose");

// mongoose
//   .connect(
//     "mongodb+srv://virajkaleworkholic:virajkaleworkholicgmailcom@cluster0.jag9pvj.mongodb.net/shikha"
//   )
//   .then(() => {
//     console.log("database connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connected = await mongoose.connect(process.env.MONGO_URL);
    console.log("Server connected");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = dbConnect;
