(function(quizApp) {

    var quizDirective = function($location, $timeout) {
        return {
            scope: {},
            restrict: 'E',
            template: '<span></span>',
            link: function(scope, element) {
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
                                countdown(mins - 1);
                            }, 1000);
                        }
                        if (element.html() === '0:00' && typeof cb === 'function') {
                            cb();
                        }
                    };
                    tick();
                }

                // 2 minute countdown until the quiz ends
                countdown(2, function() {
                    $location.url('results');
                });

            }
        }
    };

    quizApp.directive('quizTimer', ['$location', '$timeout', quizDirective]);

})(angular.module('quizApp'));