angular.module('MainCtrl', []).controller('MainController', ['$rootScope', 'MyBarService', MainController]);

function MainController($rootScope, MyBarService) {

    var vm = this;
    vm.menuItems = [];

    $rootScope.loadMenuItems = activate;

    function activate() {
        loadMenuItems().then(function () {
            console.log('Activated MainCtrl');
        });
    }

    function loadMenuItems() {
        return MyBarService.getMenuItems().then(function (data) {
            vm.menuItems = data;
            $rootScope.menuItems = vm.menuItems;
            return vm.menuItems;
        });
    }

}