var Menu = require('./models/menu');
var Bottle = require('./models/bottle');
var Ingredient = require('./models/ingredient');
var Cocktail = require('./models/cocktail');

module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    app.get('/api/menu', function (req, res) {
        // use mongoose to get all menus in the database
        Menu.find(function (err, menus) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            res.json(menus); // return all menus in JSON format
        });
    });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    app.get('/api/ingredients', function (req, res) {
        // use mongoose to get all ingredients in the database
        Ingredient.find(function (err, ingredients) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            res.json(ingredients); // return all ingredients in JSON format
        });
    });

    app.route('/api/shelf/bottles').post(Bottle.create).get(Bottle.read);
    app.route('/api/shelf/bottles/:bottleId').put(Bottle.update).delete(Bottle.delete);
    app.param('bottleId', Bottle.bottleByID);

    app.get('/api/menu/:menuId/cocktails', function (req, res) {

        // use mongoose to get all cocktails for specific menu in the database
        var id = req.params.menuId;
        Cocktail.find({menuId: id}, function (err, cocktails) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            res.json(cocktails); // return cocktails in JSON format
        });
    });

    app.get('/api/cocktails/:id', function (req, res) {

        // use mongoose to get cocktail by id in the database
        var id = req.params.id;
        Cocktail.findOne({id: id}, function (err, cocktail) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            res.json(cocktail); // return a cocktail in JSON format
        });
    });

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendFile('./public/index.html'); // load our public/index.html file
    });

};
