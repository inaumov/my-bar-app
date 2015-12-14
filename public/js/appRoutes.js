angular.module('appRoutes', ['ngRoute']).config(['$routeProvider', '$locationProvider', Config]);

function Config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainController',
            controllerAs: "mainCtrl"
        })

        // route for the menu list page
        .when('/menu', {
            templateUrl: 'views/menu.html'
        })

        .when('/menu/:id/cocktails', {
            templateUrl: 'views/cocktails.html',
            controller: 'CocktailsController',
            controllerAs: 'cocktailsCtrl',
            resolve: {
                ingredients: function (MyBarService) {
                    return MyBarService.getIngredients();
                }
            }
        })

        // route for the edit cocktail page
        .when('/cocktails/:id', {
            templateUrl: 'views/edit-cocktail.html',
            controller: 'EditCocktailController',
            controllerAs: 'cocktailCtrl',
            resolve: {
                ingredients: function (MyBarService) {
                    return MyBarService.getIngredients();
                }
            }
        })

        // route for the shelf page
        .when('/shelf', {
            templateUrl: 'views/shelf.html',
            controller: 'ShelfController',
            controllerAs: 'shelfCtrl',
            resolve: {
                ingredients: function (MyBarService) {
                    return MyBarService.getIngredients();
                }
            }
        })

        .otherwise({
            redirectTo: ''
        });

    // use the HTML5 History API
    $locationProvider.html5Mode(false); //TODO: to fix fully
}