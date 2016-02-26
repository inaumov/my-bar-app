// create the module and name it myBarApp
angular.module('myBarApp', [
    'ngRoute',
    'myBar.config',
    'appRoutes',
    'MyBarService',
    'MainCtrl',
    'CocktailsCtrl',
    'EditCocktailCtrl',
    'ShelfCtrl'
]);