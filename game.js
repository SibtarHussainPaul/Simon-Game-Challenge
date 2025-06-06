let gamePattern=[];
let buttonColors=["red","blue","green","yellow"];
let userClickedPattern=[];
 var level=0;
 var started=false;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level"+level);
        nextSequence();
        started=true;
    }
});
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    let randomNumber=Math.floor(Math.random()*4);
    let randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio= new Audio("./sounds/"+randomChosenColor+".mp3");
    audio.play();
    
}
$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
        $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart")
        playSound("wrong");
        startOver();
    }
}
function playSound(name){
    var audio= new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor){
   $("#"+currentColor).addClass("pressed");
   setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
   }, 100);
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
