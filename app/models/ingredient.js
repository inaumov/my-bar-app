// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var modelExtend = require('./ext/crudExt');

// create a schema
var ingredientSchema = new Schema({
    id: Number,
    kind: String,
    type: String
});

// define our model
var Ingredient = mongoose.model('Ingredient', ingredientSchema);

// make this available in Node applications
modelExtend(module.exports, Ingredient);
