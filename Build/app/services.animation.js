(function(quizApp) {

    var animationFactory = function() {
        var animationService = {};

        function whichTransitionEvent() {
            var t,
                el = document.createElement('fakeelement'),
                transitions = {
                    'WebkitTransition': 'webkitTransitionEnd',
                    'MozTransition': 'transitionend',
                    'transition': 'transitionend'
                };
            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        }

        var transition = whichTransitionEvent();

        animationService.transitionEnd = function(element, animationProperty, cb) {
            element.on(transition, function(event) {
                if (event.originalEvent.propertyName === animationProperty) {
                    cb();
                }
            });
        };

        return animationService;

    };

    quizApp.factory('animationFactory', [animationFactory]);

})(angular.module('quizApp'));