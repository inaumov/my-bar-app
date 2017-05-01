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
            var data = vm.ingredients;
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    for (var j = 0; j < data[key].length; j++) {
                        var el = data[key][j];
                        if (ingredient.ingredientId === el.id) {
                            return el.kind;
                        }
                    }
                }
            }
        }
    }

    vm.newCocktail = create;

    function create() {
        vm.cocktail = {
            ingredients: {}
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
                this.toggleSelection = function toggleSelection(groupName, id) {
                    var idx;
                    vm.cocktail.ingredients[groupName].some(function (entry, i) {
                        if (entry.id == id) {
                            idx = i;
                            return true;
                        }
                    });
                    // is already selected
                    if (idx > -1) {
                        vm.cocktail.ingredients[groupName].splice(idx, 1);
                    }
                    // is newly selected
                    else {
                        var newItem = {
                            ingredientId: id,
                            volume: 0,
                            // TODO check other types if needed
                            unitsValue: groupName !== 'additives' ? 'ML' : undefined
                        };
                        wrapIngredient(newItem);
                        vm.cocktail.ingredients[groupName].push(newItem);
                    }
                };
                this.isChecked = function (groupName, id) {
                    if (vm.cocktail.ingredients[groupName] == undefined) {
                        vm.cocktail.ingredients[groupName] = [];
                    }
                    return vm.cocktail.ingredients[groupName].some(function (entry) {
                        if (entry.ingredientId == id) {
                            return true;
                        }
                    });
                }
            }],
            controllerAs: 'selectIngredientsCtrl',
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
            $location.path('/cocktails/$cocktailId'.replace('$cocktailId', vm.cocktail.id));
        }

        function onError(error) {
            console.log('Unable to save the cocktail data: ' + error); // TODO: use angular ui notification instead
        }
    };

    vm.delete = function () {
        MyBarService.deleteCocktail(vm.cocktail.id);
    };

}
