// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var modelExtend = require('./ext/crudExt');

// create a schema
var cocktailSchema = new Schema({
    id: Number,
    menuId: Number,
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

module.exports.readAllByMenuId = function (req, res) {

    // use mongoose to get all cocktails for specific menu in the database
    var id = req.params.menuId;
    Cocktail.find({menuId: id}, function (err, cocktails) {

        // if there is an error retrieving, send the error.
        // nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(cocktails); // return cocktails in JSON format
    });
};