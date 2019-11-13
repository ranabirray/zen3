//@desc User controller
//@access Public
const keys = require("../config/config");
const mongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

module.exports = {
  //@retrieve item based on id
  list(req, res) {
    mongoClient.connect(
      keys.mongoURI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function(err, db) {
        if (!err) {
          const dbase = db.db(keys.dbname);
          let objectId = ObjectID(req.params.id);
          const query = { _id: objectId };
          dbase
            .collection("fav")
            .find(query)
            .toArray(function(err, result) {
              if (err) {
                let response = { success: false };
                res.send(response);
              }

              let response = { success: true, data: result };
              res.send(response);
              db.close();
            });
        }
      }
    );
  },
  //@add item
  add(req, res) {
    mongoClient.connect(
      keys.mongoURI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function(err, db) {
        if (!err) {
          const dbase = db.db(keys.dbname);
          dbase.collection("fav").insertOne(req.body, function(err, result) {
            if (err) {
              let response = { success: false };
              res.send(response);
            }
            let response = { success: true, id: result.insertedId };

            res.send(response);
            db.close();
          });
        }
      }
    );
  },
  //@update item based on id
  update(req, res) {
    mongoClient.connect(
      keys.mongoURI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function(err, db) {
        if (!err) {
          const dbase = db.db(keys.dbname);
          let objectId = ObjectID(req.params.id);

          const query = { _id: { $eq: objectId } };
          const updateField = { $set: req.body };
          dbase
            .collection("fav")
            .updateOne(query, updateField, function(err, result) {
              if (err) {
                let response = { success: false };
                res.send(response);
              }
              let response = { success: true };
              res.send(response);
              db.close();
            });
        }
      }
    );
  },
  //@ delete item using id
  delete(req, res) {
    mongoClient.connect(
      keys.mongoURI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function(err, db) {
        if (!err) {
          const dbase = db.db(keys.dbname);
          let objectId = ObjectID(req.params.id);

          const query = { _id: { $eq: objectId } };

          dbase
            .collection("fav")
            .findOneAndDelete(query, function(err, result) {
              if (err) {
                let response = { success: false };
                res.send(response);
              }
              let response = { success: true };
              console.log(result);
              res.send(response);
              db.close();
            });
        }
      }
    );
  }
};
