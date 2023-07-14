var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

$(".btn").click(function (){
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function nextSequence(){
    level++;
    var randomNumber=Math.floor(Math.random()*3);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(50).fadeIn(50);
    playSound(randomChosenColour);
    $("#level-title").text("Level "+level);
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100)
}

var started=false;
var level=0;
$(this).on("keydown",function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
            userClickedPattern=[];
        }
    }
    else{
        var audio2=new Audio("sounds/wrong.mp3");
        audio2.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
    userClickedPattern=[];
}