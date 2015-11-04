angular.module('CocktailsCtrl', []).controller('CocktailsController', CocktailsController);

function CocktailsController($rootScope, $routeParams, MyBarService) {

    $rootScope.currentMenuName = getCurrentMenuName();

    var vm = this;

    vm.cocktails = MyBarService.getCocktails($routeParams.id);

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