var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var config = require('./config');

router.post('/', function(req, res, next) {
  mongo.connect(config.DATABASE_URL, function(err, db) {
    if (err) throw err;
    var collection = db.collection("polls");
    collection.remove({
      _id: ObjectId(req.body._id)
    }, function (err) {
      if (err) throw err;
      db.close();
    })
    res.send(true);
  })
});

module.exports = router;
