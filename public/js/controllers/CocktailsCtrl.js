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

    vm.getIngredientKind = function (groupName, id) {
        for (var property in vm.ingredients) {
            if (vm.ingredients.hasOwnProperty(groupName)) {
                for (var i = 0; i < vm.ingredients[groupName].length; i++) {
                    var ingredient = vm.ingredients[groupName][i];
                    if (ingredient.id === id) {
                        return ingredient.kind;
                    }
                }
            }
        }
    };

    function findCurrentMenuName() {
        for (var item in vm.menuItems) {
            var el = vm.menuItems[item];
            if (el.name == $routeParams.menuName) {
                return el.translation;
            }
        }
    }

}