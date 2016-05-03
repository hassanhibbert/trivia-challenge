/**
 * Created by HXHibbert on 5/2/16.
 */

(function (quizApp) {

    var quizFactory = function ($http) {
        var quizServices = {},
            position = 0,
            cachedQuestions = [],
            correct = 0,
            results = [];

        quizServices.cacheData = function (dataArray) {
            dataArray.forEach(function(item){
                cachedQuestions.push(item);
            });
        };

        quizServices.loadQuestions = function () {
            return $http.get('quizData.json');
        };

        quizServices.getQuestion = function () {
            return cachedQuestions[position];
        };

        quizServices.checkAnswer = function (choice) {
            
            var correctAnswer = cachedQuestions[position].answer;
            if (correctAnswer === choice.checked) {
                correct += 1;
                results.push({answer: 'correct', question: cachedQuestions[position].question});
            }else {
                results.push({answer: 'incorrect', question: cachedQuestions[position].question});
            }
        };

        quizServices.isAnswered = function(choice) {
            return (Object.keys(choice).length > 0);
        };

        quizServices.next = function () {
            if (position !== cachedQuestions.length - 1){
                position += 1;
            } else {
                //console.log('last question');
                //console.log(results);
            }

        };

        return quizServices;
    };

    quizApp.factory('quizFactory', ['$http',quizFactory]);

})(angular.module('quizApp'));