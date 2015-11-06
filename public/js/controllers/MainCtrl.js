angular.module('MainCtrl', []).controller('MainController', MainController);

function MainController($rootScope, MyBarService) {

    var vm = this;

    vm.isMenu = false;
    vm.menuItems = [];

    activate();

    function activate() {
        loadMenuItems().then(function () {
            console.log('Activated Main View');
        });
    }

    function loadMenuItems() {
        return MyBarService.getMenuItems().then(function (data) {
            vm.menuItems = data;
            $rootScope.menuItems = vm.menuItems;
            return vm.menuItems;
        });
    }

    vm.welcomePageStepThumbnails = ['Bring ingredients :)', 'Choose from menu', 'Wait your barman'];

}