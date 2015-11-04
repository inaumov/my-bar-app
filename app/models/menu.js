// grab the mongoose module
var mongoose = require('mongoose');

// define our menu model
module.exports = mongoose.model('Menu', {
    id: {
        type: Number,
        default: ''
    },
    name: {
        type: String,
        default: ''
    }
});