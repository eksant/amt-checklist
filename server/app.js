require("dotenv").config();

const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const logger = require("morgan");
const redis = require("redis");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const cacheRedis = require("./middlewares/cache");
// const typeDefs = fs.readFileSync("./graphql/main.graphql", "utf-8");
// const resolverUser = require("./graphql/resolverUser");
// const schema = makeExecutableSchema({
//   typeDefs,
//   resolverUser
// });

const app = express();
const clientRedis = redis.createClient();

mongoose.Promise = global.Promise;
mongoose.connection.openUri("mongodb://localhost:27017/mtc", {
  autoIndex: false,
  useNewUrlParser: true
});
mongoose.connection
  .once("open", () => {
    console.log("database connection success");
  })
  .on("error", error => {
    console.error("database connection error", error);
  });

clientRedis.on("ready", err => {
  err
    ? console.error("redis client connection error : ", err)
    : console.log("redis client connection success");
});

app.use(cors());
app.use(logger("dev"));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use("/graphql", graphqlExpress({ schema }));
// app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
// app.use("/api/", cacheRedis, require("./routes/auth"));
app.use("/api/users", cacheRedis, require("./routes/users"));
// app.use("/api/mobiltangkis", cacheRedis, require("./routes/mobiltangkis"));
// app.use("/api/checklist", cacheRedis, require("./routes/checklist"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
