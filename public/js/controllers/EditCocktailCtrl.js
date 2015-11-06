angular.module('EditCocktailCtrl', []).controller('EditCocktailController', EditCocktailController);

function EditCocktailController($routeParams, MyBarService) {

    var vm = this;
    vm.drinkTypes = [];
    vm.ingredients = [];
    vm.cocktail = {};
    vm.isNew = $routeParams.id === 'new';

    activate();

    function activate() {
        loadDrinkTypes();
        loadIngredients();
        loadCocktail();
        console.log('Activated Edit Cocktail View');
    }

    function loadDrinkTypes() {
        return MyBarService.getMenuItems().then(function (data) {
            vm.drinkTypes = data;
            return vm.drinkTypes;
        });
    }

    function loadIngredients() {
        return MyBarService.getIngredients().then(function (data) {
            vm.ingredients = data;
            return vm.ingredients;
        });
    }

    function loadCocktail() {
        if (vm.isNew) {
            vm.cocktail = {};
            return vm.cocktail;
        }
        MyBarService.getCocktailById($routeParams.id).then(function (data) {
            vm.cocktail = data;
            return vm.cocktail;
        });
    }

    vm.save = function () {
        MyBarService.createCocktail(vm.cocktail);
    }

}
