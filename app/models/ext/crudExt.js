function addCrudOperations(exports, model) {

    exports.create = function (req, res) {
        var data = req.body;
        data.id = Math.floor(Math.random() * 101);
        var obj = new model(data);
        obj.save(function (err) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(obj);
            }
        });
    };

    exports.read = function (req, res) {
        // use mongoose to get all objects in the database
        model.find(function (err, objects) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            res.json(objects); // return all objects in JSON format
        });
    };

    exports.findOneByID = function (req, res) {

        // use mongoose to get object model by id in the database
        var id = req.params.model_id;
        model.findOne({id: id}, function (err, obj) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            res.json(obj); // return a found object in JSON format
        });
    };

    exports.update = function (req, res) {
        var data = req.body;
        model.update({id: data.id}, data, function (err, obj) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(data);
            }
        });
    };

    exports.delete = function (req, res) {
        var id = req.params.model_id;
        model.remove({"id": id}, function (err) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(req.obj);
            }
        })
    };

}

module.exports = addCrudOperations;