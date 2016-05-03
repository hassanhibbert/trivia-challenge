/*global jQuery*/
(function ($) {

    function ajaxRequest() {
        $.ajax({
            url: 'quizData.json',
            method: 'GET'
        }).done(success);
    }


    /*
    <div class="hide" data-question="1">
        <div class="left">
            <p class="number">1</p>
            <p class="question">What&rsquo;s Batman&rsquo;s true identity?</p>
            <div class="clear"></div>
            <div class="mult-style">
                <input type="radio" class="ans-style" name="q1" value="Thomas Wayne">
                Thomas Wayne
                <br>
                <input type="radio" class="ans-style" name="q1" value="Batman is Batman">
                Batman is Batman
                <br>
                <input type="radio" class="ans-style" name="q1" value="Bruce Wayne">
                Bruce Wayne
                <br>
                <input type="radio" class="ans-style" name="q1" value="Slade Wilson">
                Morgan Freeman
            </div>
            <div class="next-btn blue-button first">
                Next<img src="images/next-arrow.png" alt="next arrow"/>
            </div>
     </div>
     <div class="right">
        <p class="question-count">Question: 1 of 10</p>
        <div class="main-img"><img src="images/batman.jpg" alt="batman"/></div>
     </div>
     <div class="error-container"></div>
  </div>
  */

})(jQuery);

$(document).ready(function() {
	
	// SPLASH INTRO ANIMATION
	$(".circle").animate({
		left : '-=105',
		top : '-=100',
		opacity : '1',
		height : '323px',
		width : '323px',
	}, 800);
	$(".title").delay(600).fadeIn('slow');
	$(".title, .circle, .splash").delay(2000).fadeOut();
	
	// CONTENT SWITCHER 
	function contentSwitcher(val) {
		var val = val;

		$('.active').fadeOut('fast', function() {
			$(this).removeClass("active");
			$(".question-" + val).addClass("active").fadeIn();
			$('.question-count').html('Question: ' + val + ' of 10');
		});
		
		// Decide what category the question is based on what question number the quiz is on.
		
		var catg = [0,'Movie',' Movie','Candy','Logo','Animals','Food','Animals','Jewelry','Movie','Logo','Results','Answers'];
		
		// loop for inserting category
		for(var i=1; i<catg.length; i++){
			if(val == [i]){
				$('.category').html('Category: '+catg[i]);
			}
		
		}
	}

	

	function finalScore() {
		
		var totalScore = 0;
		
		// anwers in a array
		var answers = [0,"Bruce Wayne","His eyes","Marathon","chicago bulls","Whale Shark","32 feet","Reticulated python","Coal","He got bit by a radioactive spider","Toyota"];
		
		// loop that will count only correct answers
		for(var i=1; i<answers.length; i++){
			choice = $("input:radio[name=q"+[i]+"]:checked").val();
			if(choice == answers[i]){
				totalScore++;
			}
		}

		// Calculate the percent of the total score
		
		var quizPercent = totalScore / 10 * 100;
		
		// Display results of quiz
		
		$('.badge').html('<p>' + quizPercent + '%</p>')
		$('.message').html('You have correctly answered ' + totalScore + ' out of 10 questions.')
		
	}

	var a = 1;
	
	// Navigation "Next Button"
	$('.next-btn').click(function() {
	
		// Check to see if the input field has a valid selection
		if ($("input:radio[name=q" + a + "]:checked").val() == null) {
			$('.error-container').html('<div class="error clear"><p><img src="images/caution.png"/>&nbsp;Please select an answer.</p></div>').fadeIn();
			return false;
		} else {
			$('.error-container').html('');
		}
		a++
		contentSwitcher(a);
	});

	$('.back-btn').click(function() {
		a--
		contentSwitcher(a);
	});
	$('.submit-btn').click(function() {
		
		// Prevent double submission
		$(this).attr('class', 'submit-btn-noclick green-button');
		// Check to see if the input field has a valid selection
		if ($("input:radio[name=q" + a + "]:checked").val() == null) {
			$('.error-container').html('<div class="error clear"><p><img src="images/caution.png"/>&nbsp;Please select an answer.</p></div>').fadeIn();
			return false;
		} else {
			$('.error-container').html('<p>&nbsp:</p>');
		}
		a++
		// Calucate final score after submit button was clicked (finalScore function)
		finalScore();
		contentSwitcher(a);
		// Remove timer with a message about the quiz results
		$('.time-remain').html('Quiz Results');
	});
	$('.answer-btn').click(function() {
		
		// View answers on final page of quiz
		a = 12;
		contentSwitcher(a);
	});

	function countdown(minutes) {
		var seconds = 60;
		var mins = minutes

		function tick() {
			var counter = document.getElementById("timer");
			var current_minutes = mins - 1
			seconds--;
			counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
			if (seconds > 0) {
				setTimeout(tick, 1000);
			} else {

				if (mins > 1) {

					// countdown(mins-1);  
					setTimeout(function() {
						countdown(mins - 1);
					}, 1000);

				}
			}
			// submit trivia quiz once time is up.
			var time = $('#timer').html();
			if (time == "0:00") {
				finalScore();
				contentSwitcher(11);
				$('.time-remain').html('Quiz Results');
			}
		}

		tick();
	}
	// Wait 2.8 seconds so that the splash intro animation can finish before starting the count down.
	setTimeout(function() {
		countdown(2);
	}, 2800);

}); 