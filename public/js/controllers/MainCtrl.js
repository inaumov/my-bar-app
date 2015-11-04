angular.module('MainCtrl', []).controller('MainController', MainController);

function MainController($rootScope, MyBarService) {

    var vm = this;

    vm.isMenu = false;
    vm.menuItems = [];

    activate();

    function activate() {
        return getMenuItems().then(function () {
            console.log('Activated Main View');
        });
    }

    function getMenuItems() {
        return MyBarService.getMenuItems().then(function (data) {
            vm.menuItems = data;
            return vm.menuItems;
        });
    }

    vm.welcomePageStepThumbnails = ['Bring ingredients :)', 'Choose from menu', 'Wait your barman'];

}