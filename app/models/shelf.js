// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var shelfSchema = new Schema({
    id: Number,
    name: String,
    ingredient: {
        id: Number,
        name: String,
        beverageType: String,
        kind: String
    },
    brandName: String,
    volume: Number,
    price: Number,
    active: String,
    imageUrl: String
});

// define our model
var Shelf = mongoose.model('Shelf', shelfSchema);

// make this available in Node applications
module.exports = Shelf;