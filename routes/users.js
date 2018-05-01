var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  if (db === MYSQL) {
    dbContext.query("SELECT * from users", function(error, results, fields) {
      if (error) {
        res.send(JSON.stringify({ status: 500, error: error, response: null }));
        //If there is error, we send the error in the error section with 500 status
      } else {
        res.send(
          JSON.stringify({ status: 200, error: null, response: results })
        );
        //If there is no error, all is good and response is 200OK.
      }
    });
  } else if (db === POSTGRESSQL) {
    dbContext
      .any("select * from users")
      .then(function(data) {
        res.json({
          status: "success",
          data: data,
          message: "Retrieved ALL users"
        });
      })
      .catch(function(err) {
        return next(err);
      });
  } else if (db === MONGODB) {

    dbContext.collection('users').find().toArray(function(err, results) {
      console.log(results)
      // send HTML file populated with quotes here
      res.json({
        status: "success",
        data: results,
        message: "Retrieved ALL users"
      });

    })
  }
});

module.exports = router;
