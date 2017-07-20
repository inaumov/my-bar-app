// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var modelExtend = require('./ext/crudExt');

// create a schema
var ingredientSchema = new Schema({
    id: Number,
    groupName: String,
    kind: String,
    type: String
});

// define our model
var Ingredient = mongoose.model('Ingredient', ingredientSchema);

// make this available in Node applications
modelExtend(module.exports, Ingredient);

// override
exports.read = function (req, res) {

    var filterParam = req.query['filter'];

    if (!filterParam) {
        Ingredient.find(function (err, objects) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            res.json(objects); // return all objects in JSON format
            // TODO group by groupName
        });
    } else {
        Ingredient.find({groupName: filterParam}, function (err, objects) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            res.json(objects); // return cocktails in JSON format
        });
    }
};
