require("dotenv").config();
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

mongoose.connection.openUri("mongodb://localhost:27017/mtc");
mongoose.Promise = global.Promise;
mongoose.connection
  .once("open", () => {
    console.log("database connection success");
  })
  .on("error", error => {
    console.error("database connection error", error);
  });

app.use(cors());
app.use(logger("dev"));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/mobiltangkis", require("./routes/mobiltangkis"));
app.use("/api/checklist", require("./routes/checklist"));

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
