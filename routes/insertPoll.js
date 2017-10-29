var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var config = require('./config');

router.post('/', function(req, res, next) {
  mongo.connect(config.DATABASE_URL, function(err, db) {
    if (err) throw err;
    var collection = db.collection("polls");
    collection.insert({
      title: req.body.title,
      options: req.body.options,
      pollUser: req.body.pollUser,
      votes: req.body.votes,
      voteUsers: []
    }, function(err, data) {
      if (err) throw err;
      db.close();
      res.send(data);
    })
  })
});

module.exports = router;
