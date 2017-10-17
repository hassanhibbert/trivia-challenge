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
            element.addEventListener(transition, function (event) {
              if (event.propertyName === animationProperty) {
                cb(event.propertyName);
              }
            });
        };

        return animationService;

    };

    quizApp.factory('animationFactory', [animationFactory]);

})(angular.module('quizApp'));