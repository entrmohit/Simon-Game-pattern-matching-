var buttonColors=["red", "blue", "green", "yellow"];

var gamePattern=[];

var userClickedPattern=[];

var Isstarted = false;
var level=0;

$(document).on("keydown",function(){
  if(!Isstarted){
    // $("#level-title").text("Level " + level);
    nextSequence();
    Isstarted=true;
  }
});

function nextSequence(){
  level++;
  userClickedPattern=[];
  $("#level-title").text("Level " + level);

  var num=Math.floor(Math.random()*4);

  var randomChosenColor=buttonColors[num];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

$(".btn").on("click",function(){
  var userChosenColour=this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audio=new Audio("https://entrmohit.github.io/Simon-Game-pattern-matching-/sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function() {
	   $("."+currentColor).removeClass("pressed");
  }, 100);
}

// Checking answer to match every click corresponding to game pattern
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");//when 1st click matches game pattern

    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();// calling next sequence when level previous completes
      }, 1000);

    }

  } else { //If doesn't matches at any point , then start over game
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
  	   $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game-Over,Press any key to retsart");
    console.log("wrong");//printing wrong for wrong pattern

    startOver();
  }
}

function startOver(){
  level=0;
  gamePattern = [];
  Isstarted=false;
}
