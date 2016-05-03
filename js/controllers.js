/**
 * Created by HXHibbert on 5/2/16.
 */

(function (quizApp) {

    var quizController = function ($scope, quizFactory) {

        function init() {
            loadQuestions();
            $scope.quizName = 'Trivia Challenge!';
        }
        
        function updateQuestion() {
            $scope.quiz = quizFactory.getQuestion();
            $scope.choices = $scope.quiz.multipleChoice;
            $scope.formData = {};
            $scope.error = null;
        }

        function loadQuestions() {
            quizFactory.loadQuestions()
                .then(function(response){
                    quizFactory.cacheData(response.data);
                    updateQuestion();
                });
        }

        $scope.nextQuestion = function () {
            if(quizFactory.isAnswered($scope.formData)) {
                quizFactory.checkAnswer($scope.formData);
                quizFactory.next();
                updateQuestion();
            } else {
                $scope.error = 'Please select an answer.';
            }
        };

        init();

    };

    quizApp.controller('quizController', ['$scope', 'quizFactory', quizController]);

})(angular.module('quizApp'));