angular.module('EditCocktailCtrl', []).controller('EditCocktailController', EditCocktailController);

function EditCocktailController($routeParams, MyBarService) {

    var vm = this;
    vm.drinkTypes = [];

    activate();

    function activate() {
        return getDrinkTypes().then(function () {
            console.log('Activated Edit Cocktail View');
        });
    }

    function getDrinkTypes() {
        return MyBarService.getMenuItems().then(function (data) {
            vm.drinkTypes = data.map(function (item) {
                return item.name;
            });
            return vm.drinkTypes;
        });
    }

    MyBarService.getMenuItems().then(function (data) {
        vm.drinkTypes = data.map(function (item) {
            return item.name;
        });
    });

    vm.ingredients = MyBarService.getIngredients();

    if ($routeParams.id) {
        vm.cocktail = MyBarService.getCocktailById($routeParams.id);
    } else {
        vm.cocktail = {}
    }

    vm.save = function () {
        MyBarService.createCocktail(vm.cocktail);
    }

}
