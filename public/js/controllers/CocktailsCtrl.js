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

    function getCurrentMenuName() {
        var menuItems = $rootScope.menuItems;
        for (var item in menuItems) {
            var el = menuItems[item];
            if (el.id == $routeParams.id) {
                return el.name;
            }
        }
    }

}