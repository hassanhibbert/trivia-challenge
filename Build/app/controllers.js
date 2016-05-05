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
                .then(function (response) {
                    quizFactory.cacheData(response.data);
                    $scope.quizLength = quizFactory.getQuizLength();
                    updateQuestion();
                });
        }

        $scope.nextQuestion = function () {
            if (quizFactory.isAnswered($scope.formData)) {
                quizFactory.checkAnswer($scope.formData);
                quizFactory.next();
                updateQuestion();
                $scope.submitBtn = quizFactory.showSubmit();
            } else {
                $scope.error = errorMessage;
            }
        };

        $scope.submitQuiz = function () {
            if (quizFactory.isAnswered($scope.formData)) {
                quizFactory.checkAnswer($scope.formData);
                $scope.quizSubmitted = true; // flag for quiz-timer directive
                $location.url('results');
            } else {
                $scope.error = errorMessage;
            }
        };

        $scope.quizSubmitted = false; // flag for quiz-timer directive

        init();

    };


    var resultsController = function ($scope, quizFactory, $location) {
        if (quizFactory.isQuizLoaded()) {
            $scope.correctNum = quizFactory.getCorrectNumber();
            $scope.quizLength = quizFactory.getQuizLength();
            $scope.percent = quizFactory.getPercent();
            $scope.resetQuiz = function() {
                quizFactory.reset();
            };
        } else {
            $location.url('/');
        }
    };

    var reviewController = function ($scope, quizFactory, $location) {
        if (quizFactory.isQuizLoaded()) {
            $scope.review = quizFactory.getQuizReview();
            $scope.resetQuiz = function () {
                quizFactory.reset();
            };
        } else {
            $location.url('/');
        }
    };

    // quiz controller
    quizApp.controller('quizController', ['$scope', 'quizFactory', '$rootElement', '$location', quizController]);

    // results controller
    quizApp.controller('resultsController', ['$scope', 'quizFactory', '$location', resultsController]);

    // review controller
    quizApp.controller('reviewController', ['$scope', 'quizFactory', '$location', reviewController]);

})(angular.module('quizApp'));