angular.module('MainCtrl', []).controller('MainController', ['$rootScope', 'MyBarService', MainController]);

function MainController($rootScope, MyBarService) {

    $rootScope.menuItems = [];

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