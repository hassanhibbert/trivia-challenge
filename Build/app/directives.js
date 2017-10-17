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

    var introDirective = function(animationFactory, $timeout) {

        function _get(selector) {
            return document.querySelector(selector);
        }
        
        var link = function link() {
            var $circleImage = angular.element(_get('.circle')),
                $quizTitle = angular.element(_get('.title')),
                $startButton = angular.element(_get('.start-quiz')),

                animation = function () {
                    $circleImage.addClass('fadeInScale');
                    $quizTitle.addClass('fadeInScale');
                };

            animationFactory.transitionEnd($circleImage[0], 'transform', function () {
                $startButton.addClass('fadeIn');
            });

          $timeout(animation, 0);

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