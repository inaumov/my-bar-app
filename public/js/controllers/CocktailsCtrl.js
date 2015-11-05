angular.module('CocktailsCtrl', []).controller('CocktailsController', CocktailsController);

function CocktailsController($rootScope, $routeParams, MyBarService) {

    $rootScope.currentMenuName = getCurrentMenuName();

    var vm = this;
    vm.cocktails = [];

    activate();

    function activate() {
        loadCocktails().then(function () {
            console.log('Activated Cocktails List View');
        });
    }

    function loadCocktails() {
        return MyBarService.getCocktails($routeParams.id).then(function (data) {
            vm.cocktails = data;
            return vm.cocktails;
        });
    }

    vm.delete = function (item) {
        MyBarService.deleteCocktail(item.id);
    };

    function getCurrentMenuName() {
        var menuItems = MyBarService.getMenuItems();
        for (var item in menuItems) {
            var el = menuItems[item];
            if (el.id == $routeParams.id) {
                return el.name;
            }
        }
    }

}