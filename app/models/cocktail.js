// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var modelExtend = require('./ext/crudExt');

// create a schema
var cocktailSchema = new Schema({
    id: {
        type: Number, unique: true
    },
    relatedToMenu: String,
    name: String,
    ingredients: Object,
    description: String,
    available: String,
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
        Cocktail.find().distinct('relatedToMenu').exec()
            .then(function (menus) {
                var result = {};
                var cnt = 0;
                menus.forEach(function (relatedToMenu) {
                    Cocktail.find({relatedToMenu: relatedToMenu}, {'_id': 0, 'relatedToMenu': 0}).exec()
                        .then(function (cocktails) {
                            cnt++;
                            console.log('Found ', cocktails.length, ' records for: ', relatedToMenu);
                            var tempArr = [];
                            cocktails.forEach(function (ingredient) {
                                console.log(JSON.stringify(ingredient));
                                tempArr.push(ingredient);
                            });
                            result[relatedToMenu] = tempArr;
                            if (menus.length == cnt) {
                                res.send(result);
                            }
                        });
                });
                return result;
            });
    } else {
        Cocktail.find({relatedToMenu: filterParam}, {'_id': 0}, function (err, objects) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            res.json(objects); // return cocktails in JSON format
        });
    }
};