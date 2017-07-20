var Menu = require('./models/menu');
var Bottle = require('./models/bottle');
var Ingredient = require('./models/ingredient');
var Cocktail = require('./models/cocktail');

module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    app.route('/mocks/cocktails/menu').get(Menu.read);

    app.route('/mocks/cocktails').post(Cocktail.create).get(Cocktail.read).put(Cocktail.update);
    app.route('/mocks/cocktails/:model_id').get(Cocktail.findOneByID).delete(Cocktail.delete);

    app.route('/mocks/ingredients').get(Ingredient.read);

    app.route('/mocks/shelf/bottles').post(Bottle.create).get(Bottle.read).put(Bottle.update);
    app.route('/mocks/shelf/bottles/:model_id').get(Bottle.findOneByID).delete(Bottle.delete);

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        var path = require('path');
        res.sendFile(path.join(__dirname, '../public', 'index.html')); // load our public/index.html file
    });

};
