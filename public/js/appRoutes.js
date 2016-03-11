angular.module('appRoutes', ['ngRoute']).config(['$routeProvider', '$locationProvider', Config]);

function Config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html'
        })

        // route for the menu list page
        .when('/cocktails', {
            template: "<div ng-include=\"'views/templates/menu-bar.html'\"></div>"
        })

        .when('/menu/:id/cocktails', {
            templateUrl: 'views/cocktails.html',
            controller: 'CocktailsController',
            controllerAs: 'cocktailsCtrl',
            resolve: {
                ingredients: ['MyBarService', function (MyBarService) {
                    return MyBarService.getIngredients();
                }]
            }
        })

        // route for the edit cocktail page
        .when('/cocktails/:id', {
            templateUrl: 'views/edit-cocktail.html',
            controller: 'EditCocktailController',
            controllerAs: 'cocktailCtrl',
            resolve: {
                ingredients: ['MyBarService', function (MyBarService) {
                    return MyBarService.getIngredients();
                }]
            }
        })

        // route for the my space page
        .when('/my-space', {
            template: "<div ng-include=\"'views/templates/myspace-bar.html'\"></div>"
        })

        .when('/my-space/cocktails', {
            templateUrl: 'views/my-cocktails.html'
        })

        .when('/my-space/likes', {
            templateUrl: 'views/likes.html'
        })

        // route for the shelf page
        .when('/my-space/shelf', {
            templateUrl: 'views/shelf.html',
            controller: 'ShelfController',
            controllerAs: 'shelfCtrl',
            resolve: {
                ingredients: ['MyBarService', function (MyBarService) {
                    return MyBarService.getIngredients();
                }]
            }
        })

        .otherwise({
            redirectTo: ''
        });

    // use the HTML5 History API
    $locationProvider.html5Mode(false); //TODO: to fix fully
}