var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var config = require('./config');
var ObjectId = require('mongodb').ObjectID;

router.post('/', function(req, res, next) {
  mongo.connect(config.DATABASE_URL, function(err, db) {
    if (err) throw err;
    var collection = db.collection("polls");
    collection.find({
      _id: ObjectId(req.body._id),
      voteUsers: req.body.username
    }).toArray(function(err, documents) {
      if (err) return console.log(err);
      if (documents.length === 0) {
        let index = "votes." + req.body.index;
        if (req.body.isCustom) {
          collection.update({
            _id: ObjectId(req.body._id)
          }, {
            $push: {
              options: req.body.custom,
              votes: 1,
              voteUsers: req.body.username
            }
          }, function (err) {
            if (err) throw err;
            db.close();
          })
          res.send();
        } else {
          collection.update({
            _id: ObjectId(req.body._id)
          }, {
            $set: {[index]: req.body.votes},
            $push: {
              voteUsers: req.body.username
            }
          }, function (err) {
            if (err) throw err;
            db.close();
          })
          res.send();
        }
      } else {
        res.send(true);
      }
    })
  })
});

module.exports = router;
