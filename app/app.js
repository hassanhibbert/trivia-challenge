/**
 * Created by HXHibbert on 5/2/16.
 */
(function () {

   var quizApp = angular.module('quizApp', ['ngRoute']);

    quizApp.config(function($routeProvider){
        $routeProvider
            .when('/', {
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