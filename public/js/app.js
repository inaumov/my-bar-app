// create the module and name it myBarApp
angular.module('myBarApp', [
    'ngRoute',
    'ui-notification',
    'myBar.config',
    'appRoutes',
    'MyBarService',
    'MainCtrl',
    'CocktailsCtrl',
    'EditCocktailCtrl',
    'ShelfCtrl'
]);