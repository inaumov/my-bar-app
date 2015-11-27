// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var modelExtend = require('./ext/crudExt');

// create a schema
var menuSchema = new Schema({
    id: Number,
    name: String
});

// define our model
var Menu = mongoose.model('Menu', menuSchema);

// make this available in Node applications
modelExtend(module.exports, Menu);