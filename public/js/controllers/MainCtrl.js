angular.module('MainCtrl', []).controller('MainController', ['MyBarService', MainController]);

function MainController(MyBarService) {

    var vm = this;
    vm.menuItems = [];

    vm.loadMenuItems = activate;

    function activate() {
        loadMenuItems().then(function () {
            console.log('Activated MainCtrl');
        });
    }

    function loadMenuItems() {
        return MyBarService.getMenuItems().then(function (data) {
            vm.menuItems = data;
            return vm.menuItems;
        });
    }

}