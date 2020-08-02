const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://new-user:YQmhUSsIi57sQ3Za@cluster0.9q0nf.mongodb.net/newsdb?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  )
    .then((client) => {
      console.log("connected to MongoDB...");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.error("Error occurred creating database connection\n\n", err);
      console.log("\nExiting process");
      process.exit(1);
    });
};

const getDb = () => {
  if (_db) return _db;
  throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
