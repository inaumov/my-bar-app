// modules =================================================
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var mongodb = require('mongodb');
var fs = require('fs');

// configuration ===========================================

// config files
var db = require('./config/db');

// read mock files and refresh mock data
mongodb.MongoClient.connect(db.url, function (err, db) {
    if (err) {
        throw err;
    }
    db.collection('menus').drop();
    db.collection('cocktails').drop();
    db.collection('ingredients').drop();
    db.collection('bottles').drop();

    readAndPopulate('menu.json', 'menus');
    readAndPopulate('cocktails.json', 'cocktails');
    readAndPopulate('ingredients.json', 'ingredients');
    readAndPopulate('bottles.json', 'bottles');

    function readAndPopulate(mockFileName, collectionName) {
        fs.readFile('./app/mocks/' + mockFileName, 'utf8', function (err, data) {
            if (err) {
                throw err;
            }
            // console.log(data);
            var obj = JSON.parse(data);
            db.collection(collectionName).insert(obj);
        });
    }
});
// set our port
var port = process.env.PORT || 8080;

// connect to our mongoDB database
mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================
require('./app/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shout-out to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;