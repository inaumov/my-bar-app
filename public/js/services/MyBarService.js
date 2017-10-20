angular.module('MyBarService', ['myBar.config']).factory('MyBarService', ['$http', 'GENERAL_CONFIG', MyBarService]);

function MyBarService($http, GENERAL_CONFIG) {

    var BASE_URL = GENERAL_CONFIG.BASE_URL;

    var service = {

        getMenuItems: function () {
            var apiCall = $http.get(BASE_URL + '/cocktails/menu', {
                cache: true
            });
            return handleResponse(apiCall);
        },

        getCocktails: function (menuNameParam) {
            var apiCall = $http.get(BASE_URL + '/cocktails',
                {
                    params: {
                        filter: menuNameParam
                    }
                });
            return handleResponse(apiCall);
        },

        getCocktailById: function (id) {
            var apiCall = $http.get(BASE_URL + '/cocktails/' + id);
            return handleResponse(apiCall);
        },

        createCocktail: function (data) {
            var apiCall = $http.post(BASE_URL + '/cocktails', data);
            return handleResponse(apiCall);
        },

        updateCocktail: function (data) {
            var apiCall = $http.put(BASE_URL + '/cocktails', data);
            return handleResponse(apiCall);
        },

        deleteCocktail: function (id) {
            var apiCall = $http.delete(BASE_URL + '/cocktails/' + id);
            return handleResponse(apiCall);
        },

        getIngredients: function (groupNameParam) {
            var apiCall = $http.get(BASE_URL + '/ingredients', {
                params: {
                    filter: groupNameParam
                },
                cache: true
            });
            return handleResponse(apiCall);
        },

        getBottleList: function () {
            var apiCall = $http.get(BASE_URL + '/shelf/bottles');
            return handleResponse(apiCall);
        },

        createBottle: function (data) {
            var apiCall = $http.post(BASE_URL + '/shelf/bottles', data, 'headers');
            return handleResponse(apiCall);
        },

        updateBottle: function (data) {
            var apiCall = $http.put(BASE_URL + '/shelf/bottles', data);
            return handleResponse(apiCall);
        },

        deleteBottle: function (id) {
            var apiCall = $http.delete(BASE_URL + '/shelf/bottles/' + id);
            return handleResponse(apiCall);
        }

    };

    return service;

    function handleResponse(apiCall) {

        return apiCall
            .then(getRequestCallComplete)
            .catch(getRequestCallFailed);

        function getRequestCallComplete(response) {
            if (typeof response.data === 'object') {
                return response.data;
            } else if (response.status === 500) {
                // invalid response
                console.error('XHR Failed for [', response.data, '].');
            }
        }

        function getRequestCallFailed(error) {
            // something went wrong
            console.error('XHR Failed for [', error.data, '].');
            throw error;
        }
    }

}