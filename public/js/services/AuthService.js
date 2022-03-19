angular.module('AuthService', ['myBar.config']).factory('AuthService', ['$http', 'GENERAL_CONFIG', AuthService]);

function AuthService($http, GENERAL_CONFIG) {

    const AUTH_URL = GENERAL_CONFIG.AUTH_URL;

    return {

        token: function (credentials) {

            var apiCall = $http.post(AUTH_URL, null, {
                headers: {
                    Authorization: "Basic "
                        + btoa('my-bar-app' + ":" + 'secret001')
                },
                params: {
                    grant_type: 'password',
                    username: credentials.username,
                    password: credentials.password,
                    scope: 'my-bar'
                }
            });
            return handleResponse(apiCall);
        },

    };

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