// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var bottleSchema = new Schema({
    id: Number,
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

// make this available in Node applications
module.exports = Bottle;