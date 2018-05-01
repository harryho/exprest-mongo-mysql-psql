var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
// var bodyParser = require("body-parser");
var logger = require("morgan");
var mysql = require("mysql");
var http = require("http");
var index = require("./routes/index");
var users = require("./routes/users");
var promise = require("bluebird");
var options = { promiseLib: promise };
var pgp = require("pg-promise")(options);
var mongoClient = require('mongodb').MongoClient;

global.MYSQL = "mysql";
global.POSTGRESSQL = "postgresql";
global.MONGODB = "mongodb";

var app = express();

var database = process.env.DB || "";

console.log(database);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const mongoURI = 'mongodb://localhost:27017/sample';
var mongodb ;
mongoClient.connect(mongoURI, (err, client)=>{
  if (err) return console.log(err)
  mongodb = client.db('sample')
});

//Database dbContext
app.use(function(req, res, next) {
  global.db = database;
  switch (database) {
    case MYSQL:
      var mysqlContext = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "toor",
        database: "sample"
      });
      global.dbContext = mysqlContext;
      dbContext.connect();
      break;

    case POSTGRESSQL:
      const config = 'postgres://postgres:postgres@localhost:5432/sample';
      var postgresContext = pgp(config);
      global.dbContext = postgresContext;
      break;
    case MONGODB:
     
      // var postgresContext =
      global.dbContext =  mongodb
      
      break;
    default:
      throw new Error("Database config is missing!!!");
  }
  next();
});

app.use("/", index);
app.use("/api/v1/users", users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
var server = http.createServer(app);
server.listen(3001);
