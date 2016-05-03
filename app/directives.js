/**
 * Created by HXHibbert on 5/2/16.
 */

(function (quizApp) {

    var quizDirective = function () {
        return {
            scope: {
                title: '@'
            },
            restrict: 'EA',
            template: '<span></span>',
            link: function ($scope, element) {
                function countdown(minutes,cb) {
                    var seconds = 60,
                        mins = minutes;
                    var tick = function() {
                        var current_minutes = mins - 1;
                        seconds--;
                        element.html(current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds));
                        if (seconds > 0) {
                            setTimeout(tick, 1000);
                        } else if (mins > 1) {
                            setTimeout(function() {
                                countdown(mins - 1);
                            }, 1000);
                        }
                        if (element.html() === '0:00' && typeof cb === 'function') {
                            cb();
                        }
                    };
                    tick();
                }

                countdown(1, function() {
                    console.log('done');
                });

            }
        }
    };

    quizApp.directive('quizTimer', quizDirective);

})(angular.module('quizApp'));