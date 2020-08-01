const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://new-user:YQmhUSsIi57sQ3Za@cluster0.9q0nf.mongodb.net/Cluster0?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  )
    .then(() => {
      console.log("connected to MongoDB...");
      callback();
    })
    .catch((err) => {
      console.error("Error occurred creating database connection\n\n", err);
      //console.log("");
      console.log("\nExiting process");
      process.exit(1);
    });
};

module.exports = mongoConnect;
