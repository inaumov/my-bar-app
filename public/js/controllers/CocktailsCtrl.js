angular.module('CocktailsCtrl', []).controller('CocktailsController', CocktailsController);

function CocktailsController($rootScope, $routeParams, ingredients, MyBarService) {

    $rootScope.currentMenuName = getCurrentMenuName();

    var vm = this;
    vm.cocktails = [];
    vm.ingredients = ingredients;

    activate();

    function activate() {
        loadCocktails();
        console.log('Activated Cocktails List View');
    }

    function loadCocktails() {
        return MyBarService.getCocktails($routeParams.id).then(function (data) {
            vm.cocktails = data;
            return vm.cocktails;
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