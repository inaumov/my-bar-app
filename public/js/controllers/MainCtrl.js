angular.module('MainCtrl', []).controller('MainController', ['$rootScope', 'GENERAL_CONFIG', 'MyBarService', MainController]);

function MainController($rootScope, GENERAL_CONFIG, MyBarService) {

    $rootScope.menuItems = [];
    $rootScope.appVersion = GENERAL_CONFIG.APP_VERSION;

    activate();

    function activate() {
        loadMenuItems().then(function () {
            console.log('Activated MainCtrl');
        });
    }

    function loadMenuItems() {
        return MyBarService.getMenuItems().then(function (data) {
            $rootScope.menuItems = data;
            return $rootScope.menuItems;
        });
    }

}