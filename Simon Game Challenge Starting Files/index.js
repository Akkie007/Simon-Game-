var gamePattern=[];
var userClickedPattern=[];
var level =0;
var started=false;

$(document).on("keypress",main);

function nextSequence(){
    userClickedPattern=[];
    level++;
    changeHeading(level);
    var n=Math.random();
    n=(n*4)+1;
    n=Math.floor(n);
    var color;
    color = returnColor(n);
    gamePattern.push(color);
    playSound(color);
    animate(color);
}

function main(){
    if(!started){
        started=true;
        nextSequence();
    }
}

function changeHeading(lev){
    $("#level-title").text("level "+lev);
}

$(".btn").on("click",function(){
    var c;
    c=$(this).attr("id");
    playSound(c);
    animateButton(c);
    userClickedPattern.push(c);
    check(userClickedPattern.length-1);
})

function check(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function animateButton(c){
    setTimeout(function(){
        $("#"+c).toggleClass("pressed");
    },100);
    $("#"+c).toggleClass("pressed");   
}

function returnColor(n){
    var col;
    if(n==1){
        col="green";
    }    
    else if(n==2){
        col="red";
    }
    else if(n==3){
        col="yellow";
    }
    else if(n==4){
        col="blue";
    }
    return col;
}

function animate(color){
    $("#"+color).fadeToggle().fadeToggle();
}

function playSound(color){
    var audio=new Audio("./sounds/"+color+".mp3");
    audio.play();    
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }