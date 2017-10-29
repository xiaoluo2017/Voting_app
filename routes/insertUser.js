var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var config = require('./config');

router.post('/', function(req, res, next) {
  mongo.connect(config.DATABASE_URL, function(err, db) {
    if (err) throw err;
    var collection = db.collection("users");
    collection.find({
      username: req.body.username
    }).toArray(function(err, documents) {
      if (err) return console.log(err);
      if (documents.length === 0) {
        collection.insert({
          username: req.body.username,
          password: req.body.password
        }, function(err, data) {
          if (err) throw err;
          db.close();
          res.send(false);
        })
      } else {
        res.send(true);
      }
    })
  })
});

module.exports = router;
