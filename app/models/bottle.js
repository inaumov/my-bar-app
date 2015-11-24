// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var bottleSchema = new Schema({
    id: {
        type: Number, unique: true
    },
    ingredient: {
        id: Number
    },
    brandName: String,
    volume: Number,
    price: Number,
    inShelf: String,
    imageUrl: String
});

// define our model
var Bottle = mongoose.model('Bottle', bottleSchema);

module.exports.create = function (req, res, next) {
    var data = req.body;
    data.id = Math.floor(Math.random() * 101);
    var bottle = new Bottle(data);
    bottle.save(function (err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(bottle);
        }
    });
};

module.exports.read = function (req, res) {
    // use mongoose to get all bottles in the database
    Bottle.find(function (err, bottles) {

        // if there is an error retrieving, send the error.
        // nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(bottles); // return all bottles in JSON format
    });
};

module.exports.bottleByID = function (req, res, next) {
    var id = req.params.bottleId;
    Bottle.findOne({id: id}, function (err, bottle) {
            if (err) {
                return next(err);
            }
            else {
                req.bottle = bottle;
                next();
            }
        }
    );
};

module.exports.update = function (req, res, next) {
    var id = req.params.bottleId;
    var data = req.body;
    Bottle.update({"id": id}, data, function (err, bottle) {
        if (err) {
            return next(err);
        }
        else {
            res.json(bottle);
        }
    });
};

module.exports.delete = function (req, res, next) {
    var id = req.params.bottleId;
    Bottle.remove({"id": id}, function (err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(req.bottle);
        }
    })
};