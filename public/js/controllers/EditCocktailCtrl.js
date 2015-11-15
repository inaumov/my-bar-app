angular.module('EditCocktailCtrl', ['ngDialog']).controller('EditCocktailController', EditCocktailController);

function EditCocktailController($routeParams, MyBarService, ngDialog) {

    var vm = this;
    vm.drinkTypes = [];
    vm.ingredients = [];
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

    function wrapIngredient(ingredient) {
        ingredient.getKind = function () {
            for (var j = 0; j < vm.ingredients.length; j++) {
                var ingredient = vm.ingredients[j];
                if (ingredient.id === this.id) {
                    return ingredient.kind;
                }
            }
        }
    }

    function loadCocktail() {

        vm.isNew ? create() : get();

        function create() {
            vm.cocktail = {ingredients: []};
        }

        function get() {
            MyBarService.getCocktailById($routeParams.id).then(function (data) {
                vm.cocktail = data;
                for (var i = 0; i < vm.cocktail.ingredients.length; i++) {
                    wrapIngredient(vm.cocktail.ingredients[i]);
                }
            })
        }
    }

    vm.showIngredients = function () {
        ngDialog.open({
            template: 'views/templates/select-ingredients.html',
            controller: function IngredientsListController(data) {
                this.data = data;
                // toggle selection for a given kind
                this.toggleSelection = function toggleSelection(id) {
                    var idx;
                    vm.cocktail.ingredients.some(function (entry, i) {
                        if (entry.id == id) {
                            idx = i;
                            return true;
                        }
                    });
                    // is currently selected
                    if (idx > -1) {
                        vm.cocktail.ingredients.splice(idx, 1);
                    }
                    // is newly selected
                    else {
                        var ingredient = {id: id, volume: 0, units: 'ML' };
                        wrapIngredient(ingredient);
                        vm.cocktail.ingredients.push(ingredient);
                    }
                };
                this.isChecked = function (id) {
                    return vm.cocktail.ingredients.some(function (entry) {
                        if (entry.id == id) {
                            return true;
                        }
                    });
                }
            },
            controllerAs: 'ingredientsListCtrl',
            resolve: {
                data: function () {
                    return vm.ingredients;
                }
            }
        });
    };

    vm.save = function () {
        MyBarService.createCocktail(vm.cocktail);
    };

    vm.delete = function (item) {
        MyBarService.deleteCocktail(item.id);
    };

}
