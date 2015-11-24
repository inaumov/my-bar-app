angular.module('ShelfCtrl', []).controller('ShelfController', ShelfController);

function ShelfController(ingredients, MyBarService) {

    var vm = this;
    vm.formPanel = false;
    vm.editMode = false;
    vm.itemsInShelf = [];
    vm.ingredients = ingredients;

    activate();

    function activate() {
        loadItemsInShelf();
        console.log('Activated Shelf List View');
    }

    function loadItemsInShelf() {
        return MyBarService.getBottleList().then(function (data) {
            vm.itemsInShelf = data;
            return vm.itemsInShelf;
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

    vm.newBottle = function () {
        vm.bottle = {
            ingredient: {},
            brandName: '',
            volume: '',
            price: '',
            inShelf: 'YES',
            imageUrl: ''
        }
    };

    vm.save = function () {
        for (var i = 0; i < vm.ingredients.length; i++) {
            if (vm.bottle.ingredient.kind === vm.ingredients[i].kind) {
                vm.bottle.ingredient.id = vm.ingredients[i].id;
            }
        }
        // TODO consider resolving promise and handle errors
        MyBarService.saveBottle(vm.bottle);
        if (vm.editMode) {
            vm.editMode = false;
            var idx = vm.itemsInShelf.map(function (x) {
                return x.id;
            }).indexOf(vm.bottle.id);
            vm.itemsInShelf.splice(idx, 1);
        }
        vm.itemsInShelf.push(vm.bottle);
        vm.formPanel = false;
    };

    vm.edit = function (item) {
        vm.bottle = item;
        vm.editMode = true;
        vm.formPanel = true;
    };

    vm.delete = function (item) {
        MyBarService.deleteBottle(item.id);
        var index = vm.itemsInShelf.indexOf(item);
        if (index > -1) {
            vm.itemsInShelf.splice(index, 1);
        }
    }

}