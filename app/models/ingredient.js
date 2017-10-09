// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var modelExtend = require('./ext/crudExt');

// create a schema
var ingredientSchema = new Schema({
    id: {
        type: Number, unique: true
    },
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
        Ingredient.find().distinct('groupName').exec()
            .then(function (groupNames) {
                var result = {};
                var cnt = 0;
                groupNames.forEach(function (groupName) {
                    Ingredient.find({groupName: groupName}, {'_id': 0, 'groupName': 0}).exec()
                        .then(function (ingredients) {
                            cnt++;
                            console.log('Found ', ingredients.length, ' records for: ', groupName);
                            var items = [];
                            ingredients.forEach(function (ingredient) {
                                console.log(JSON.stringify(ingredient));
                                items.push(ingredient);
                            });
                            result[groupName] = {
                                "uomValues": groupName === 'additives' ? ['PCS', 'G'] : ['ML', 'DROP', 'DASH', 'TSP'],
                                "items": items
                            };
                            if (groupNames.length === cnt) {
                                res.send(result);
                            }
                        });
                });
                return result;
            });
    } else {
        Ingredient.find({groupName: filterParam}, {'_id': 0}, function (err, objects) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            res.json(objects); // return cocktails in JSON format
        });
    }
};
