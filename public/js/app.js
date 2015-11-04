// create the module and name it myBarApp
angular.module('myBarApp', [
    'ngRoute',
    'appRoutes',
    'MyBarService',
    'MainCtrl',
    'CocktailsCtrl',
    'EditCocktailCtrl',
    'ShelfCtrl'
]);