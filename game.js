buttonColors = ["red", "yellow", "green", "blue"];

gamePattern = [];

userClickedPattern = [];

started = false;

level = 0;

//listening to keyboard key at the start

$(document).keypress(function () {

    if (!started) {

        $("#level-title").text("Level " + level)
        nextSequence();
        started = true;

    }


});








//listening to clicks and storing it in userclickedpattern

$(".btn").click(function () {

    userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);

    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);


});

//check if the user clicked the correct button

function checkAnswer(currentValue) {

    if (userClickedPattern[currentValue] === gamePattern[currentValue]) {

        console.log("success");

        if (userClickedPattern.length == gamePattern.length) {

            setTimeout(function () {

                nextSequence();
            }, 1000);

        }


    }

    else {
        console.log("wrong");

        playSound("wrong"); //plays wrong sound when user clicks are not valid

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");

        }, 200)

        $("#level-title").text("Game Over , Press Any Key To Restart")

        startOver();


    }


}






function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);  //selecting id same as randomChosenColor

    playSound(randomChosenColor);


}



//play animation when user clicks on a button

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {

        $("#" + currentColor).removeClass("pressed");

    }, 100)



}





//playing sound for selected button

function playSound(name) {

    audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

//start over function resetting preset values

function startOver() {

    level = 0;
    gamePattern = [];
    started = false;


}



