angular.module('CocktailsCtrl', []).controller('CocktailsController', ['$routeParams', 'ingredients', 'MyBarService', CocktailsController]);

function CocktailsController($routeParams, ingredients, MyBarService) {

    var vm = this;
    vm.menuItems = [];
    vm.selectedMenuName = '';
    vm.cocktails = [];
    vm.ingredients = ingredients;

    activate();

    function activate() {
        if ($routeParams.menuName) {
            loadMenuItems();
        }
        loadCocktails();
        console.log('Activated CocktailsCtrl');
    }

    function loadCocktails() {
        var menuName = $routeParams.menuName;

        return menuName != null ? MyBarService.getCocktails(menuName).then(function (data) {
            vm.cocktails = data[menuName];
            return vm.cocktails;
        }) : [];
    }

    function loadMenuItems() {
        return MyBarService.getMenuItems().then(function (data) {
            vm.menuItems = data;
            vm.selectedMenuName = findCurrentMenuName();
            return vm.menuItems;
        });
    }

    function findCurrentMenuName() {
        for (var [index, el] of vm.menuItems.entries()) {
            if (el.name === $routeParams.menuName) {
                return el.translation;
            }
        }
    }

}