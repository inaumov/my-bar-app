var Menu = require('./models/menu');
var Bottle = require('./models/bottle');
var Ingredient = require('./models/ingredient');
var Cocktail = require('./models/cocktail');

module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    app.route('/api/menu').get(Menu.read);
    app.route('/api/menu/:menuId/cocktails').get(Cocktail.readAllByMenuId);

    app.route('/api/cocktails').post(Cocktail.create).get(Cocktail.read);
    app.route('/api/cocktails/:model_id').get(Cocktail.findOneByID).put(Cocktail.update).delete(Cocktail.delete);

    app.route('/api/ingredients').get(Ingredient.read);

    app.route('/api/shelf/bottles').post(Bottle.create).get(Bottle.read);
    app.route('/api/shelf/bottles/:model_id').put(Bottle.update).delete(Bottle.delete);

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendFile('index.html', { root: '../public' }); // load our public/index.html file
    });

};
