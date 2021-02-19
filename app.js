var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let nunjucks = require("nunjucks");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var albumsRouter = require("./routes/albums");
var eventRouter = require("./routes/event");
var blogRouter = require("./routes/blog");
var contactRouter = require("./routes/contact");
var loginRouter = require("./routes/login");
var signupRouter = require("./routes/signup");
var cartRouter = require("./routes/cart");
var checkoutRouter = require("./routes/checkout");
var logoutRouter = require("./routes/logout");

var app = express();

const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

var onlineDb =
  "mongodb+srv://sa:Sam@@2015!@cluster0.gmpti.mongodb.net/dreamit?retryWrites=true&w=majority";

// Connecting to the database
mongoose
  .connect(onlineDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })

  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    // process.exit();
  });

// view engine setup

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "html"); // set liquid to default

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/albums-store", albumsRouter);
app.use("/event", eventRouter);
app.use("/blog", blogRouter);
app.use("/contact", contactRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/cart", cartRouter);
app.use("/checkout", checkoutRouter);
app.use("/logout", logoutRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
