angular.module('ShelfCtrl', []).controller('ShelfController', ShelfController);

function ShelfController(MyBarService) {

    var vm = this;
    vm.formPanel = false;
    vm.editMode = false;
    vm.itemsInShelf = MyBarService.getItemsInShelf();
    vm.ingredients = MyBarService.getIngredients();

    vm.createEmptyProduct = function() {
        vm.product = {
            ingredient: {
            },
            brandName: '',
            volume: '',
            price: '',
            active: '',
            pictureUrl: ''
        }
    };

    vm.save = function () {
        if (vm.editMode) {
            vm.product = {};
            vm.editMode = false;
            vm.formPanel = false;
        }

        for (var i = 0; i < vm.ingredients.length; i++) {
            if (vm.product.ingredient.kind === vm.ingredients[i].kind) {
                vm.product.ingredient = vm.ingredients[i];
            }
        }
        MyBarService.addToShelf(vm.product);
        vm.itemsInShelf.push(vm.product);
        vm.formPanel = false;
    };

    vm.edit = function (item) {
        vm.product = item;
        vm.editMode = true;
        vm.formPanel = true;
    };

    vm.delete = function (item) {
        MyBarService.deleteFromShelf(item);
        var index = vm.itemsInShelf.indexOf(item);
        if (index > -1) {
            vm.itemsInShelf.splice(index, 1);
        }
    }

}