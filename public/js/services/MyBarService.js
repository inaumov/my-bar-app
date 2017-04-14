angular.module('MyBarService', ['myBar.config']).factory('MyBarService', ['$http', 'GENERAL_CONFIG', MyBarService]);

function MyBarService($http, GENERAL_CONFIG) {

    var BASE_URL = GENERAL_CONFIG.BASE_URL;

    var service = {

        getMenuItems: function () {
            return $http.get(BASE_URL + '/cocktails/menu', {
                cache: true
            })
                .then(getRequestCallComplete)
                .catch(getRequestCallFailed);
        },

        getCocktails: function (menuNameParam) {
            return $http.get(BASE_URL + '/cocktails',
                {
                    params: {
                        filter: menuNameParam
                    }
                })
                .then(getRequestCallComplete)
                .catch(getRequestCallFailed);
        },

        getCocktailById: function (id) {
            return $http.get(BASE_URL + '/cocktails/' + id)
                .then(getRequestCallComplete)
                .catch(getRequestCallFailed);
        },

        createCocktail: function (data) {
            return $http.post(BASE_URL + '/cocktails', data);
        },

        updateCocktail: function (data) {
            return $http.put(BASE_URL + '/cocktails', data);
        },

        deleteCocktail: function (id) {
            return $http.delete(BASE_URL + '/cocktails/' + id);
        },

        getIngredients: function (groupNameParam) {
            return $http.get(BASE_URL + '/ingredients', {
                params: {
                    filter: groupNameParam
                },
                cache: true
            })
                .then(getRequestCallComplete)
                .catch(getRequestCallFailed);
        },

        getBottleList: function () {
            return $http.get(BASE_URL + '/shelf/bottles')
                .then(getRequestCallComplete)
                .catch(getRequestCallFailed);
        },

        createBottle: function (data) {
            return $http.post(BASE_URL + '/shelf/bottles', data, 'headers');
        },

        updateBottle: function (data) {
            return $http.put(BASE_URL + '/shelf/bottles', data);
        },

        deleteBottle: function (id) {
            return $http.delete(BASE_URL + '/shelf/bottles/' + id);
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