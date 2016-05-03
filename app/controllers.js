/**
 * Created by HXHibbert on 5/2/16.
 */

(function (quizApp) {

    var quizController = function ($scope, quizFactory) {

        function init() {
            loadQuestions();
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
                $scope.submitBtn = quizFactory.showSubmit();
            } else {
                $scope.error = 'Please select an answer.';
            }
        };

        $scope.submitQuiz = function() {
            console.log('check answer and submit quiz');
        };

        init();

    };


    var resultsController = function ($scope, quizFactory) {

    };
    
    var reviewController = function ($scope, quizFactory) {

    };



    // quiz controller
    quizApp.controller('quizController', ['$scope', 'quizFactory', quizController]);

    // results controller
    quizApp.controller('resultsController', ['$scope', 'quizFactory', resultsController]);

    // review controller
    quizApp.controller('reviewController', ['$scope', 'quizFactory', reviewController]);

})(angular.module('quizApp'));