angular.module('MyBarService', []).factory('MyBarService', ['$http', MyBarService]);

function MyBarService($http) {

    var service = {

        getMenuItems: function () {

            return $http.get('/api/menu')
                .then(getMenuItemsComplete)
                .catch(getMenuItemsFailed);

            function getMenuItemsComplete(response) {
                if (typeof response.data === 'object') {
                    return response.data;
                } else {
                    // invalid response
                    console.log('XHR Failed for getMenuItems.' + response.data);
                }
            }

            function getMenuItemsFailed(error) {
                // something went wrong
                console.log('XHR Failed for getMenuItems.' + error.data);
            }
        },

        getCocktails: function (menuId) {
            return $http.get('/api/cocktails', menuId);
        },

        getCocktailById: function (id) {
            return $http.get('/api/cocktails', id);
        },

        createCocktail: function (data) {
            return $http.post('/api/cocktails', data);
        },

        deleteCocktail: function (id) {
            return $http.delete('/api/cocktails/' + id);
        },

        getIngredients: function () {
            return $http.get('/api/ingredients');
        },

        getItemsInShelf: function () {
            return $http.get('/api/shelf');
        },

        addToShelf: function (data) {
            return $http.post('/api/shelf', data);
        },

        deleteFromShelf: function (id) {
            return $http.delete('/api/shelf/' + id);
        }

    };

    return service;

}