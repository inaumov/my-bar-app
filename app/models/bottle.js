// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var modelExtend = require('./ext/crudExt');

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
modelExtend(module.exports, Bottle);