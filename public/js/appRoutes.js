angular.module('appRoutes', ['ngRoute']).config(['$routeProvider', Config]);

function Config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainController'
        })

        // route for the menu list page
        .when('/menu', {
            templateUrl: 'views/menu.html'
        })

        .when('/menu/:id/cocktails', {
            templateUrl: 'views/cocktails.html',
            controller: 'CocktailsController'
        })

        // route for the edit cocktail page
        .when('/cocktails/:id', {
            templateUrl: 'views/edit-cocktail.html',
            controller: 'EditCocktailController'
        })

        // route for the shelf page
        .when('/shelf', {
            templateUrl: 'views/shelf.html',
            controller: 'ShelfController'
        })

        .otherwise({
            redirectTo: ''
        });
}