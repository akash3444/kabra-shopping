const mongoose = require("mongoose");
const config = require("./config"); // get config file

// shopping
mongoose.Promise = global.Promise;
const mongoOption = {
  keepAlive: 300000,

  connectTimeoutMS: 30000,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  poolSize: 10, // Can now run 10 operations at a time
  useFindAndModify: false,
};
const connectionString = `mongodb://localhost:27017/${config.database.database}`;

mongoose.connect(connectionString, mongoOption).then(
  () => {
    console.log("Database is connected");
  },
  (err) => {
    console.log("Can not connect to the database " + err);
  }
);
mongoose.set("useCreateIndex", true);
