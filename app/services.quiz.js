(function(quizApp) {

    var quizFactory = function($http) {
        var quizServices = {},
            position = 0,
            cachedQuestions = [],
            correct = 0,
            review = [];

        quizServices.cacheData = function(dataArray) {
            dataArray.forEach(function(item) {
                cachedQuestions.push(item);
            });
        };

        quizServices.loadQuestions = function() {
            return $http.get('quizData.json');
        };

        quizServices.getQuestion = function() {
            return cachedQuestions[position];
        };

        quizServices.checkAnswer = function(choice) {
            var selectedValue = choice.checked,
                correctAnswer = cachedQuestions[position].answer,
                selectedAnswer = cachedQuestions[position].multipleChoice[selectedValue],
                selectedQuestion = cachedQuestions[position].question,
                questionId = cachedQuestions[position].id;

            if (correctAnswer === selectedValue) {
                correct += 1;
                review.push({
                    answer: 'Correct',
                    question: selectedQuestion,
                    selected: selectedAnswer,
                    class: 'green',
                    id: questionId
                });
            } else {
                review.push({
                    answer: 'Incorrect',
                    question: selectedQuestion,
                    selected: selectedAnswer,
                    class: 'red',
                    id: questionId
                });
            }
        };

        quizServices.isAnswered = function(choice) {
            return (Object.keys(choice).length > 0);
        };

        quizServices.next = function() {
            position += 1;
        };

        quizServices.showSubmit = function() {
            return (position === (cachedQuestions.length - 1))
        };

        quizServices.getCorrectNumber = function() {
            return correct;
        };

        quizServices.reset = function() {
            position = 0;
            correct = 0;
            cachedQuestions = [];
            review = [];
        };

        quizServices.getQuizLength = function() {
            return cachedQuestions.length;
        };

        quizServices.getPercent = function() {
            var quizLength = cachedQuestions.length;
            return Math.round((correct / quizLength) * 100);
        };

        quizServices.getQuizReview = function() {
            return review;
        };

        return quizServices;
    };

    quizApp.factory('quizFactory', ['$http', quizFactory]);

})(angular.module('quizApp'));