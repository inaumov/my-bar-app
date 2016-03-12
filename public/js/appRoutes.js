angular.module('appRoutes', ['ngRoute']).config(['$routeProvider', '$locationProvider', Config]);

function Config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html'
        })

        // route for the menu list page
        .when('/menu', {
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

        // route for the edit custom cocktail page
        .when('/my/cocktails/:id/edit', {
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
        .when('/my', {
            template: "<div ng-include=\"'views/templates/myspace-bar.html'\"></div>"
        })

        .when('/my/cocktails', {
            templateUrl: 'views/my-cocktails.html'
        })

        .when('/my/likes', {
            templateUrl: 'views/likes.html'
        })

        // route for the shelf page
        .when('/my/shelf/bottles', {
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
    $locationProvider.html5Mode(true);
}