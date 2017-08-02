var numInput = document.getElementById("num-input");
var submitButton = document.getElementById("submitbutton");
var feedback = document.querySelector("#feedback");
var topmsg = document.querySelector("#topmsg");
var clearButton = document.getElementById("clearbutton");
var resetButton = document.getElementById("resetbutton");
var angryMan = document.querySelector("#angryman");
var newMin = document.getElementById("newmin");
var newMax = document.getElementById("newmax");
var rangeButton = document.getElementById("submaxminbutton");
var newGameButton = document.getElementById("newgame");
var minText = document.getElementById("mintext");
var maxText = document.getElementById("maxtext");
var displayGuess = document.getElementById("guessednum");
var airhorn = new Audio('airhorn.mp3');


// Random Number Generator
var min = 0;
var max = 100;
var randomNum = generateRandom();

function generateRandom(){
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

// outputs text for current range (included in every if statement)
minText.innerHTML = min;
maxText.innerHTML = max;

// disables guess, clear and reset buttons when field is blank
if (numInput.value === "") {
	clearButton.disabled = true;
	resetButton.disabled = true;
	submitButton.disabled = true;
}

// enables those buttons when field is typed in
numInput.addEventListener('keyup', function() {
	if (numInput.value !== "") {
		clearButton.disabled = false;
		submitButton.disabled = false;
		resetButton.disabled = false;
	} else {
		clearButton.disabled = true;
		submitButton.disabled = true;
		resetButton.disabled = true;
	}
});

// disables new range buttons
if (newMax.value === "" || newMin.value === "") {
	rangeButton.disabled = true;
}
newMax.addEventListener('keyup', function() {
	if (newMax.value !== "" && newMin.Value !== "") {
		rangeButton.disabled = false;
	} else {
		rangeButton.disabled = true;
	}
});
newMin.addEventListener('keyup', function() {
	if (newMax.value !== "" && newMin.Value !== "") {
		rangeButton.disabled = false;
	} else {
		rangeButton.disabled = true;
	}
});

// The game
submitButton.addEventListener("click", game);
function game(event) {
	event.preventDefault();
	var guess = numInput.value;

	displayGuess.innerHTML = guess;
	guessInt = parseInt(guess);

//checks if it is a number
	if (isNaN(guessInt) === true) {
		topmsg.innerText = "Hey, numbers only, pal!";
		feedback.innerText = "";
		displayGuess.innerHTML = "";
		alert("ERROR! NUMBERS ONLY, PAL!");
		angryMan.style.display = "inline-block";
		minText.innerHTML = min;
		maxText.innerHTML = max;
		newGameButton.style.display = "none";
	}
//checks if in range
	if (guessInt > max || guessInt < min) {
		topmsg.innerText = "You are out of range!";
		feedback.innerText = ("Try between " + min + " and " + max + " please!");
		displayGuess.innerHTML = "";
		alert("Hey Pal. You're out of the range!");
		angryMan.style.display = "inline-block";
		minText.innerHTML = min;
		maxText.innerHTML = max;
		newGameButton.style.display = "none";
	}
	// checks if guess is too high
	if (guessInt > randomNum && guessInt < max) {
		console.log("high")
		topmsg.innerText = "Your last guess was";
		feedback.innerText = "That is too high!";
		angryMan.style.display = "none";
		minText.innerHTML = min;
		maxText.innerHTML = max;
		newGameButton.style.display = "none";
	}
	// checks if guess is too low
	if (randomNum > guessInt && guessInt > min) {
		console.log("low")
		topmsg.innerText = "Your last guess was";
		feedback.innerText = "That is too low!";
		angryMan.style.display = "none";
		minText.innerHTML = min;
		maxText.innerHTML = max;
		newGameButton.style.display = "none";
	}
	// checks if guess is correct
	if (guessInt === randomNum) {
		console.log("correct")
		topmsg.innerText = "Your last guess was";
		feedback.innerText = "BOOM!";
		angryMan.style.display = "none";
		airhorn.play();
		newGameButton.style.display = "inline-block";
		minText.innerHTML = min;
		maxText.innerHTML = max;
	}
};

// Sets a custom range
rangeButton.addEventListener('click', newRange);

function newRange(event) {
	event.preventDefault();
	if (isNaN(newMin.value) || isNaN(newMax.value)) {
		alert("Please Enter A Real Number");
	} else {
		var maxInput = newMax.value;
		var minInput = newMin.value;
		max = parseInt(maxInput);
		min = parseInt(minInput);
		randomNum = generateRandom();
		minText.innerHTML = min;
		maxText.innerHTML = max;
	}
};

// if user wins, new game button appears and when clicked 10 is added to min and max of range
newGameButton.addEventListener("click", tenRange);

function tenRange(event) {
	event.preventDefault();
	max = max + 10;
	min = min - 10;
	randomNum = Math.floor(Math.random() * (max - min + 1) + min);
	minText.innerHTML = min;
	maxText.innerHTML = max;
};
