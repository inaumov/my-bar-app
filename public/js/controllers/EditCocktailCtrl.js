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

    function loadCocktail() {
        if (vm.isNew) {
            vm.cocktail = {
                ingredients: []
            };
            return vm.cocktail;
        }
        MyBarService.getCocktailById($routeParams.id).then(function (data) {
            vm.cocktail = data;
            return vm.cocktail;
        });
    }

    vm.showIngredients = function () {
        ngDialog.open({
            template: 'views/templates/select-ingredients.html',
            controller: function IngredientsListController(data) {
                this.data = data;
                // toggle selection for a given kind
                this.toggleSelection = function toggleSelection(kind) {
                    var idx;
                    vm.cocktail.ingredients.some(function (entry, i) {
                        if (entry.kind == kind) {
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
                        vm.cocktail.ingredients.push({kind: kind, volume: 0});
                    }
                };
                this.isChecked = function (kind) {
                    return vm.cocktail.ingredients.some(function (entry) {
                        if (entry.kind == kind) {
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
    }

}
