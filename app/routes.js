var Menu = require('./models/menu');

module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    app.get('/api/menus', function (req, res) {
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

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });

};
