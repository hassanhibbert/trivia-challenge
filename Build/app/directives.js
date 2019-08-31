(function(quizApp) {

    var quizDirective = function($location, $timeout) {

        var link = function link(scope, element) {
            function countdown(minutes, cb) {
                var seconds = 60,
                    mins = minutes;
                var tick = function() {
                    var current_minutes = mins - 1;
                    seconds--;
                    element.html(current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds));
                    if (seconds > 0) {
                        $timeout(tick, 1000);
                    } else if (mins > 1) {
                        $timeout(function() {
                            countdown(mins - 1, cb);
                        }, 1000);
                    }

                    if (element.html() === '0:00') {
                        cb();
                    } else if (scope.quizSubmit === 'true') { // end timer when quiz is submitted
                        tick = null;
                    }
                };
                tick();
            }

            countdown(Number(scope.minute), function() {
                $location.url('results');
            });
        };

        return {
            scope: { minute: '@',  quizSubmit: '@' },
            restrict: 'E',
            link: link
        };
    };

    var introDirective = function() {

        function _get(selector) {
            return document.querySelector(selector);
        }
        
        var link = function link() {
            angular.element(_get('.circle')).addClass('fadeInScale');
            angular.element(_get('.title')).addClass('fadeInScale');
            angular.element(_get('.start-quiz')).addClass('fadeIn');
        };

        return {
            scope: {},
            restrict: 'EA',
            link: link,
            templateUrl: 'partials/intro-template.html'
        };
    };

    // quiz timer directive
    quizApp.directive('quizTimer', ['$location', '$timeout', quizDirective]);

    // quiz intro directive
    quizApp.directive('quizIntro', ['animationFactory', '$timeout', introDirective]);

})(angular.module('quizApp'));