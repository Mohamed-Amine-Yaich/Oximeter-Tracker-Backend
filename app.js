var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/usersRoute");
var adminRoute = require("./routes/adminRoute");
var doctorRoute = require("./routes/doctorRoute");
var messageRoute = require("./routes/messageRoute");
var dataRoute = require("./routes/dataRoute");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//middelware take call back
//using route as middelware
//app.use("/", indexRouter);
app.use("/users", usersRouter);
/* app.use("/admin", adminRoute);
 */ //app.use("/doctor", doctorRoute);
app.use("/message", messageRoute);
app.use("/data", dataRoute);

// catch 404 and forward to error handler
app.use("*", function (req, res, next) {
  next(createError("no such page with this route", 404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  //added by me
  console.log("err handler err.stack :" + err.stack);
  /* res.locals.stack = err.stack */
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
