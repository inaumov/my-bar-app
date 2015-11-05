// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var menuSchema = new Schema({
    id: Number,
    name: String
});

// define our model
var Menu = mongoose.model('Menu', menuSchema);

// make this available in Node applications
module.exports = Menu;