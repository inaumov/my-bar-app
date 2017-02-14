angular.module('ShelfCtrl', []).controller('ShelfController', ['beverages', 'MyBarService', '$timeout', '$location', '$anchorScroll', ShelfController]);
function ShelfController(beverages, MyBarService, $timeout, $location, $anchorScroll) {

    var vm = this;
    vm.formPanel = false;
    vm.editMode = false;
    vm.itemsInShelf = [];
    vm.beverages = beverages;

    activate();

    function activate() {
        loadItemsInShelf();
        console.log('Activated ShelfCtrl');
    }

    function loadItemsInShelf() {
        return MyBarService.getBottleList().then(function (data) {
            vm.itemsInShelf = data;
            return vm.itemsInShelf;
        });
    }

    vm.getIngredientKind = function (id) {
        for (var i = 0; i < vm.beverages.length; i++) {
            var ingredient = vm.beverages[i];
            if (ingredient.id === id) {
                return ingredient.kind;
            }
        }
    };

    vm.newBottle = function () {
        vm.bottle = {
            id: null,
            ingredient: {},
            brandName: '',
            volume: '',
            price: '',
            inShelf: 'NO',
            imageUrl: ''
        }
    };

    vm.save = function () {
        for (var i = 0; i < vm.beverages.length; i++) {
            if (vm.bottle.ingredient.kind === vm.beverages[i].kind) {
                vm.bottle.ingredient.id = vm.beverages[i].id;
            }
        }
        // TODO consider resolving promise and handle errors
        if (vm.editMode) {
            MyBarService.updateBottle(vm.bottle);
            vm.editMode = false;
            var idx = vm.itemsInShelf.map(function (x) {
                return x.id;
            }).indexOf(vm.bottle.id);
            vm.itemsInShelf.splice(idx, 1);
        } else {
            MyBarService.createBottle(vm.bottle);
        }
        vm.itemsInShelf.push(vm.bottle);
        vm.formPanel = false;
    };

    vm.edit = function (item) {
        for (var i = 0; i < vm.beverages.length; i++) {
            if (item.ingredient.id === vm.beverages[i].id) {
                item.ingredient.kind = vm.beverages[i].kind;
            }
        }
        vm.bottle = angular.copy(item);
        vm.editMode = true;
        vm.formPanel = true;
    };

    vm.delete = function (item) {
        MyBarService.deleteBottle(item.id);
        var index = vm.itemsInShelf.indexOf(item);
        if (index > -1) {
            vm.itemsInShelf.splice(index, 1);
        }
    };

    vm.scrollTo = function (elementId) {
        $timeout(function () {
            $location.hash(elementId);
            $anchorScroll();
            // clear anchor
            $location.hash(null);
        }, 100);
    }

}