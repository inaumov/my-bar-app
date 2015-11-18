angular.module('MyBarService', []).factory('MyBarService', ['$http', MyBarService]);

function MyBarService($http) {

    var service = {

        getMenuItems: function () {
            return $http.get('/api/menu')
                .then(getRequestCallComplete)
                .catch(getRequestCallFailed);
        },

        getCocktails: function (menuId) {
            return $http.get('/api/menu/' + menuId + '/cocktails')
                .then(getRequestCallComplete)
                .catch(getRequestCallFailed);
        },

        getCocktailById: function (id) {
            return $http.get('/api/cocktails/' + id)
                .then(getRequestCallComplete)
                .catch(getRequestCallFailed);
        },

        createCocktail: function (data) {
            return $http.post('/api/cocktails', data);
        },

        deleteCocktail: function (id) {
            return $http.delete('/api/cocktails/' + id);
        },

        getIngredients: function () {
            return $http.get('/api/ingredients', {
                cache: true
            })
                .then(getRequestCallComplete)
                .catch(getRequestCallFailed);
        },

        getItemsInShelf: function () {
            return $http.get('/api/shelf')
                .then(getRequestCallComplete)
                .catch(getRequestCallFailed);
        },

        addToShelf: function (data) {
            return $http.post('/api/shelf', data);
        },

        deleteFromShelf: function (id) {
            return $http.delete('/api/shelf/' + id);
        }

    };

    return service;

    function getRequestCallComplete(response) {
        if (typeof response.data === 'object') {
            return response.data;
        } else {
            // invalid response
            console.log('XHR Failed for [].' + response.data);
        }
    }

    function getRequestCallFailed(error) {
        // something went wrong
        console.log('XHR Failed for [].' + error.data);
    }

}