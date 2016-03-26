angular.module('EditCocktailCtrl', ['ngDialog']).controller('EditCocktailController',
    ['$routeParams', '$location', 'ingredients', 'MyBarService', 'ngDialog', EditCocktailController]);

function EditCocktailController($routeParams, $location, ingredients, MyBarService, ngDialog) {

    var vm = this;
    vm.drinkTypes = [];
    vm.ingredients = ingredients;
    vm.isNew = $routeParams.id === 'new';

    activate();

    function activate() {
        loadMenuItems();
        loadCocktail();
        console.log('Activated EditCocktailCtrl');
    }

    function loadMenuItems() {
        return MyBarService.getMenuItems().then(function (data) {
            vm.drinkTypes = data;
            return vm.drinkTypes;
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

    vm.newCocktail = create;

    function create() {
        vm.cocktail = {
            ingredients: []
        }
    }

    function loadCocktail() {

        vm.isNew ? create() : get();

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
            templateUrl: 'views/templates/select-ingredients.html',
            controller: ['ingredients', function (ingredients) {
                this.data = ingredients;
                // toggle selection for a given kind
                this.toggleSelection = function toggleSelection(id, type) {
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
                        var ingredient = {
                            id: id,
                            volume: 0,
                            // TODO check other types if needed
                            units: type !== 'other' ? 'ML' : undefined
                        };
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
            }],
            controllerAs: 'ingredientsListCtrl',
            resolve: {
                ingredients: function () {
                    return vm.ingredients;
                }
            }
        });
    };

    vm.save = function () {
        if (vm.isNew) {
            MyBarService.createCocktail(vm.cocktail)
                .success(onSuccess)
                .error(onError);
        } else {
            MyBarService.updateCocktail(vm.cocktail)
                .success(onSuccess)
                .error(onError);
        }

        function onSuccess() {
            console.log('The item was saved!'); // TODO: use angular ui notification instead
            $location.path('/menu/$menuId/cocktails/'.replace('$menuId', vm.cocktail.menuId));
        }

        function onError(error) {
            console.log('Unable to save the employee data: ' + error); // TODO: use angular ui notification instead
        }
    };

    vm.delete = function () {
        MyBarService.deleteCocktail(vm.cocktail.id);
    };

}
