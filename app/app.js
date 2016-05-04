(function() {

    var quizApp = angular.module('quizApp', ['ngRoute', 'ngAnimate']);

    quizApp.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'introController',
                templateUrl: 'partials/intro.html'
            })
            .when('/quiz', {
                controller: 'quizController',
                templateUrl: 'partials/quiz.html'
            })
            .when('/results', {
                controller: 'resultsController',
                templateUrl: 'partials/results.html'
            })
            .when('/review', {
                controller: 'reviewController',
                templateUrl: 'partials/review.html'
            })
            .otherwise({redirectTo: '/'});
    });

})();