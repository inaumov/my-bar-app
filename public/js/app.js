// create the module and name it myBarApp
angular.module('myBarApp', [
    'ngRoute',
    'ui-notification',
    'myBar.config',
    'appRoutes',
    'MyBarService',
    'IngredientKindFilter',
    'MainCtrl',
    'CocktailsCtrl',
    'EditCocktailCtrl',
    'ShelfCtrl'
]);