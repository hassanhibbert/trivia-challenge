/**
 * Created by HXHibbert on 5/2/16.
 */

(function (quizApp) {

    var quizController = function ($scope, quizFactory, $rootElement, $location) {

        var errorMessage = 'Please select an answer.';

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
                    $scope.quizLength = quizFactory.getQuizLength();
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
                $scope.error = errorMessage;
            }
        };

        $scope.submitQuiz = function() {
            if(quizFactory.isAnswered($scope.formData)) {
                quizFactory.checkAnswer($scope.formData);
                $location.url('results');
            } else {
                $scope.error = errorMessage;
            }
        };

        init();

    };


    var resultsController = function ($scope, quizFactory) {
        $scope.correctNum = quizFactory.getCorrectNumber();
        $scope.quizLength = quizFactory.getQuizLength();
        $scope.percent = quizFactory.getPercent();
        $scope.resetQuiz = quizFactory.reset;
    };

    var reviewController = function ($scope, quizFactory) {
        $scope.review =  quizFactory.getQuizReview();
        $scope.allCorrect = quizFactory.isAllCorrect();
        $scope.resetQuiz = quizFactory.reset;
    };


    // quiz controller
    quizApp.controller('quizController', ['$scope', 'quizFactory', '$rootElement', '$location', quizController]);

    // results controller
    quizApp.controller('resultsController', ['$scope', 'quizFactory', resultsController]);

    // review controller
    quizApp.controller('reviewController', ['$scope', 'quizFactory', reviewController]);

})(angular.module('quizApp'));