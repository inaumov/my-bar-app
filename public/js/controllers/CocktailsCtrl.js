angular.module('CocktailsCtrl', []).controller('CocktailsController', ['$routeParams', 'ingredients', 'MyBarService', CocktailsController]);

function CocktailsController($routeParams, ingredients, MyBarService) {

    var vm = this;
    vm.menuItems = [];
    vm.selectedMenuName = '';
    vm.cocktails = [];
    vm.ingredients = ingredients;

    activate();

    function activate() {
        if ($routeParams.id) {
            loadMenuItems();
        }
        loadCocktails();
        console.log('Activated CocktailsCtrl');
    }

    function loadCocktails() {
        var menuId = $routeParams.id;

        return menuId != null ? MyBarService.getCocktails(menuId).then(function (data) {
            vm.cocktails = data;
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

    vm.getIngredientKind = function (id) {
        for (var i = 0; i < vm.ingredients.length; i++) {
            var ingredient = vm.ingredients[i];
            if (ingredient.id === id) {
                return ingredient.kind;
            }
        }
    };

    function findCurrentMenuName() {
        for (var item in vm.menuItems) {
            var el = vm.menuItems[item];
            if (el.id == $routeParams.id) {
                return el.name;
            }
        }
    }

}