// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var modelExtend = require('./ext/crudExt');

// create a schema
var cocktailSchema = new Schema({
    id: Number,
    relatedToMenu: String,
    name: String,
    ingredients: [
        {
            id: Number,
            volume: Number,
            units: String,
            missing: Boolean
        }
    ],
    description: String,
    state: String,
    imageUrl: String
});

// define our model
var Cocktail = mongoose.model('Cocktail', cocktailSchema);

// make this available in Node applications
modelExtend(module.exports, Cocktail);

// override
exports.read = function (req, res) {

    var filterParam = req.query['filter'];

    if (!filterParam) {
        Cocktail.find(function (err, objects) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            res.json(objects); // return all objects in JSON format
            // TODO group by relatedToMenu
        });
    } else {
        Cocktail.find({relatedToMenu: filterParam}, function (err, objects) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            res.json(objects); // return cocktails in JSON format
        });
    }
};