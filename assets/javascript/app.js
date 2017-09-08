//Questions 
var triviaQuestions = [{
	question: "Who peed on Monica's jelllyfish sting?", 
	answerChoices: ["Joey", "Ross", "Chandler", "Pheobe"],
	correctAnswer: 2
},
{
	question: "What is Pheobe's signature song?", 
	answerChoices: ["Mother's Ashes", "Smelly Cat", "Babies", "Emma's birthday song"],
	correctAnswer: 1
},
{
	question: "What is Chandler's middle name?", 
	answerChoices: ["Muriel", "Helen", "Jack", "Smirky"],
	correctAnswer: 0
},
{
	question: "How many times does Ross get married?", 
	answerChoices:["1", "2", "3", "4"],
	correctAnswer: 2
},
{
	question: "What does Chandler's co-worker, Bob, think Chandler's name is?", 
	answerChoices:["Paul", "Smith", "Joey", "Toby"],
	correctAnswer: 3
},
{
	question: "What did Phoebe find in a can of soda?", 
	answerChoices: ["Coin", "Fish", "Thumb", "Eye"],
	correctAnswer: 2
},
{
	question: "How many babies did Phoebe carry for her brother?", 
	answerChoices: ["1", "2", "3", "4"],
	correctAnswer: 2
},
{
	question: "What does Phoebe legally change her name to?", 
	answerChoices: ["Phoebe Hannigan", "Princess Consuela Banana Hammock", "Crap Bag", "Regina Phalange"],
	correctAnswer: 1
},
{
	question: "What does Monica recieve from her father after he ruins all of her childhood items?", 
	answerChoices: ["a lot of money", "gym membership", "trip to Hawaii", "a porsche"],
	correctAnswer: 3
},
{
	question: "Where did Chandler have to work after he fell asleep in a meeting?", 
	answerChoices: ["Manhattan", "London", "Tulsa", "Vermont"],
	correctAnswer: 2
},

];

//variables

var gifArray = ["question1", "question2", "question3", "question4", "question5", "question6", "question7", "question8", "question9", "question10"];

var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered; 

var seconds;
var time;
var answered; 
var userSelect; 

var messages = {
	correct: "Correct! Way to go!",
	incorrect: "Incorrect! Sorry, that's not it!",
	endTime: "Whoops! You're out of time!",
	finished: "Alright, let's see the results!"
}


$("#startOver").hide();


$ ("#startBtn").on("click", function(){
	$(this).hide();
	newGame();
});


//newGame
function newGame(){
	$ ("#finalMessage").empty();
	$ ("#correctAnswers").empty();
	$ ("#incorrectAnswers").empty();
	$ ("#unansweredQuestions").empty(); 
	$("#startOver").hide();


	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0; 
	unanswered = 0;

	newQuestion();
}

function newQuestion(){
	$ ("#message").empty();
	$ ("#correctedAnswer").empty();
	$ ("#gif").empty();
	answered = true; 

	$("#currentQuestion").html("Question #" + (currentQuestion + 1));
	$(".question").html("<h2>" + triviaQuestions[currentQuestion].question + "</h2>");

	for (var i = 0; i < 4; i++) {
		var choices = $("<div>");
		choices.text(triviaQuestions[currentQuestion].answerChoices[i]);
		choices.attr({"data-index": i });
		choices.addClass("thisChoice");
		$(".answerChoices").append(choices);
	}

	countdown();
	//clicking an answer will pause the time and setup answerPage
	$(".thisChoice").on("click", function(){
		userSelect = $("thisChoice").data("index");
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 20;
	$ ("#timeLeft").html("<h3> Time Remaining: " + seconds + "</h3>");
	answered = true;

	time = setInterval(showCountdown, 500);
}

function showCountdown(){
	seconds--;
	$ ("#timeLeft").html("<h3> Time Remaining: " + seconds + "</h3>");
	if (seconds < 1 ){
		clearInterval(time);
		answered = false; 
		answerPage();
	}
}

function answerPage(){
	$ ("currentQuestion").hide();
	$ (".thisChoice").hide();
	$ (".question").empty();

	var AnswerText = triviaQuestions[currentQuestion].answerChoices;
	var AnswerIndex = triviaQuestions[currentQuestion].correctAnswer;
	//$ ("#gif").html("<img src = ")/////image link

//checks to see if correct, incorrect or unanswered
	if ((userSelect == AnswerIndex) && (answered == true)){
		correctAnswer++;
		$("#message").html(messages.correct);
		$("#correctAnswer").html("The correct answer was: " + AnswerText);
	}
	else if ((userSelect !== AnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$("#message").html(messages.incorrect);
		$("#correctAnswer").html("The correct answer was: " + AnswerText);
	}
	else {
		unanswered++;
		$("#message").html(messages.endTime);
		$("#correctAnswer").html("The correct answer was: " + AnswerText);
		answered = true;
	}

	if ((currentQuestion) ==(triviaQuestions.length -1)){
		setTimeout(scoreboard, 5000);
	}
	else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}
}

function scoreboard(){
	$("#timeLeft").empty();
	$("#message").empty();
	$("#correctedAnswer").empty();
	$("#gif").empty();

	$("#finalMessage").html(messages.finished);
	$("#correctAnswers").html("Correct answers: " + correctAnswer);
	$("#incorrectAnswers").html("Incorrect answers: " + incorrectAnswer);
	$("#unanswered").html("Unanswered: " + unanswered);
	$("#startOver").addClass("reset");
	$("#startOver").show();
	$("#startOver").html("Start Over?");

	scoreboard();

}