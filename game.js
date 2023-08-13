var buttonColours = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var userClickedPattern = [];
var count = 0,
  level = 0;

//Functions
function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}

function nextSequence() {
  $("#level-title").text("Level " + ++level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //Animation effect
  $("#" + randomChosenColour)
    .fadeOut(50)
    .fadeIn(50);

  //Sound effect
  playSound(randomChosenColour);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  count = 0;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

function checkAnswer(currentLevel) {
  if (
    userClickedPattern[currentLevel] === gamePattern[currentLevel] ||
    level === 0
  ) {
    if (currentLevel === level - 1 && level !== 0) {
      //Correct sequence completed so increasing the game sequence by 1
      setTimeout(nextSequence, 1000);

      //Resetting to check next user sequence
      userClickedPattern = [];
    }

    return true;
  } else {
    startOver();

    //Changing h1
    $("#level-title").text("Game Over, Press Any Key to Restart");

    //Playing wrong sound
    playSound("wrong");

    //Applying wrong to body
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    return false;
  }
}

//Action listeners
$(document).on("keypress", function () {
  if (count === 0) {
    setTimeout(nextSequence, 500);
    count++;
  }
});

$(".btn").on("click", function (event) {
  var userChosenColour = this.id;

  if (level !== 0) {
    userClickedPattern.push(userChosenColour);
  }

  //checking user answer
  if (checkAnswer(userClickedPattern.length - 1)) {
    //Play user clicked button sound and animate press
    playSound(userChosenColour);
    animatePress(userChosenColour);
  }
});

$("body").on("click", function (event) {
  if ($("#level-title").text().slice(0, 5) !== "Level") {
    $("#level-title").fadeOut(100).fadeIn(500);
  } else if (!buttonColours.includes(event.target.id)) {
    $(".btn").fadeOut(100).fadeIn(500);
  }
});
