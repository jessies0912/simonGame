// Array to store the pattern sequence
var gamePattern = [];
// Variable to store the level
var level = 0;
// Array to store user's clicked pattern
var userClickedPattern = [];

// Function to generate a random color and add it to the pattern
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4); // Generate a random number between 0 and 3
    var buttonColors = ["green", "red", "yellow", "blue"];
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); // Flash animation for the button
    playSound(randomChosenColor); // Play sound for the button
    $("#level-title").text("Level " + level); // Update level title
    level++;
}

// Function to play sound for a given color
function playSound(color) {
    var audio = new Audio("./sounds/"+ color + ".mp3");
    audio.play();
}

// Function to handle button click
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor); // Play sound for the clicked button
    animatePress(userChosenColor); // Add animation to the clicked button
    // Check if the user's pattern matches the game's pattern
    checkAnswer(userClickedPattern.length - 1);
});

// Function to add animation to the clicked button
function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);
}

// Function to check if the user's pattern matches the game's pattern
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        playSound("./sounds/"+"wrong.mp3");
        $("body").addClass("game-over");
        $("#level-title").text("Game over, Press any keyboard key to restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        restartGame();
    }
}

// Function to restart the game
function restartGame() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

// Event listener for starting the game
$(document).keypress(function() {
    if (level === 0) {
        nextSequence();
    }
});
