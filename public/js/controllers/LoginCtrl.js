angular.module('LoginCtrl', []).controller('LoginController', ['$rootScope', '$http', '$location', 'AuthService', LoginController]);

function LoginController($rootScope, $http, $location, AuthService) {

    var vm = this;

    var authenticate = function (credentials, callback) {

        AuthService.token(credentials).then(function (data) {
            if (data.access_token) {
                $rootScope.authenticated = true;
                $rootScope.access_token = data.access_token;
            } else {
                $rootScope.authenticated = false;
            }
            callback && callback();
        }).catch(function () {
            $rootScope.authenticated = false;
            callback && callback();
        });
    }
    vm.credentials = {};

    vm.login = function () {
        authenticate(vm.credentials, function () {
            if ($rootScope.authenticated) {
                $location.path("/");
                vm.error = false;
            } else {
                $location.path("/login");
                vm.error = true;
            }
        });
    };

    vm.logout = function () {
        $rootScope.authenticated = false;
        $rootScope.access_token = undefined;
        $location.path("/");
    }

}