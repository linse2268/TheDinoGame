/*
CHANGES:
-paralax background
-more enemies (different colors, sizes and speeds)
-more custom look (light/darkmode, different characters)
-

FINISHED CHANGES:
-better start and restart function
-highscore

FUTURE CHANGES:
-login system for highscore saving
-worldranking
-parallel playing with friends
*/
var character = document.getElementById('character');       //player
var block = document.getElementById('block');               //enemy
var text = document.getElementById('text');
var body = document.getElementById('body');
var score = document.getElementById('score');               //score
var highscoreText = document.getElementById('highscore');
var roundText = document.getElementById('round');
var roundValue = 0;
var highscoreValue = 0;
var viewportWidth = parseInt(window.innerWidth);            //measures the width of the users display
var running = false;                                                     
var jumpHeight = 162; // Default jump height                //jumpheight (later set by viewportWidth)
var jumpDuration = 500;                                     

var jumping = false;                        

block.style.animation = "none";
block.style.display = "none";


// Adjust jump height based on viewport width
setInterval(function(){
    if (viewportWidth <= 900) {
        jumpHeight = 30;          //small view!!!!!!!!!!!!!!!!!!!!
        normalHeight = 105;
    } else {
        jumpHeight = 100;         //normal desktop view!!!!!!!!!!!!!!!!!!!!!!
        normalHeight = 217;
    }
},10)


body.addEventListener('click', jumpactive); // checks if clicked/jump requested
function jumpactive(){       // checks, if game is running && not already jumping 
    if(running && !jumping ){
        jump();
    }
}

function jump() {
        jumping = true;   //declares that character is jumping --> cannot jump again until jump is finished
        const startTime = performance.now();

        function animateJump(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = elapsedTime / jumpDuration;

            if (progress < 1) {
                const jumpProgress = Math.sin(progress * Math.PI); // Apply a sine function for a more natural jump curve
                const heightOffset = normalHeight - (jumpProgress * jumpHeight);

                character.style.top = heightOffset + 'px';

                requestAnimationFrame(animateJump);
            } else {
                character.style.top = normalHeight + 'px'; // Reset position
                jumping = false;  //declares that is not jumping --> player can jump again
            }
            
        }
        requestAnimationFrame(animateJump);
        
}

var checkdead = setInterval(function() {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    if (viewportWidth <= 900) {
        if (blockLeft < 20 && blockLeft > 0 && characterTop >= 90) {
            contact();
        }
    } else {
        if (blockLeft < 40 && blockLeft > 0 && characterTop >= 175) {
            contact();
        }
    }
}, 10)

function contact(){
    block.style.animation = "none";
    block.style.display = "none";
    
    newHighscore();
    running = false;
    character.style.top = normalHeight + 'px'; // Reset position
    text.innerText = "You Lose";
    setTimeout(function() {
        text.innerText = "Let's Play!";
    }, 3000)
}

function newHighscore(){
    if(highscoreValue < time){
        console.log("new highscore '" + time + "' in round " + roundValue);
        highscoreText.innerText = "HScr " + time;
        highscoreValue = time;
    }
}


function restart() {            //used for Start and restart
    runningFunction();
    time = 0;
    roundValue++;
    if(roundValue < 10){
        roundValue = "0" + roundValue;
    }
    roundText.innerText = "Rnd " + roundValue; 
    score.innerText = "Scr 00000";
    jumping = true;
    running = true;
    setTimeout(function(){
        jumping = false;
    },1)

}

function runningFunction() {
    block.style.animation = "block linear infinite";
    block.style.animationDuration = "1.5s"
    block.style.display = "block";
}

var time = 0;
setInterval(function() {
    if (running) {

        time++;
        if(time < 10){
            time = "0000" + time;
        }
        else if(time < 100){
            time = "000" + time;
        }
        else if(time < 1000){
            time = "00" + time;
        }
        else if(time < 10000){
            time = "0" + time;
        }
        score.innerText = "Scr " + time;
    }
}, 100)