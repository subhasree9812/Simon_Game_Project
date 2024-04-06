let gameSeq =[];
let userSeq =[];
let highestScore = 0;


let btns =["red","yellow","green","purple"]
let started = false;
let level = 0;


let audioRed = new Audio('buttonclick sound.mp3');
let audioYellow = new Audio('buttonclick sound.mp3');
let audioGreen = new Audio('buttonclick sound.mp3');
let audioPurple = new Audio('buttonclick sound.mp3');
let audioGameOver = new Audio('gameover sound.mp3');


let h2 = document.querySelector("h2");
let highestScoreDisplay = document.querySelector("#highest-score");

document.addEventListener("keypress",function(){
    if(started == false){
    console.log("Game is Started");
    started = true;
    
    levelUp();
} 
});

function gameFlashWithSound(btn){
    btn.classList.add("flash");
    setTimeout(function () {
    btn.classList.remove("flash");
    },250);


    switch (btn.getAttribute("id")) {
        case "red":
            audioRed.play();
            break;
        case "yellow":
            audioYellow.play();
            break;
        case "green":
            audioGreen.play();
            break;
        case "purple":
            audioPurple.play();
            break;
        default:
            break;
    }
}


function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function () {
    btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq =[];
    level++;
    h2.innerText = `Level ${level}`;
    

    //random btn choose
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
   // console.log(randIdx);
    //console.log(randColor);
    //console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlashWithSound(randBtn);
    
}



function btnPress() {
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    // Play sound effect when the button is pressed
    switch (userColor) {
        case "red":
            audioRed.play();
            break;
        case "yellow":
            audioYellow.play();
            break;
        case "green":
            audioGreen.play();
            break;
        case "purple":
            audioPurple.play();
            break;
        default:
            break;
    }

    checkAns(userSeq.length - 1);
}


function checkAns(idx){
    //console.log("curr level:",level);
    //let idx = level-1;

    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
            //levelUp();
        }
        //console.log("same value");
    }else{
        gameOver();}}

        


        function gameOver() {
        h2.innerHTML = `Game Over!Press any key to Restart.`;
        document.querySelector("body").style.backgroundColor = "red";
        console.log("Game Over! Press any key to restart");
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        },200);

        audioGameOver.play()
        
        if (level > highestScore) {
      highestScore = level;
      console.log(`New Highest Score: ${highestScore}`);
      updateHighestScoreboard(level, highestScore);
    }
    reset();
}
        
  function updateHighestScoreboard(level, score) {
    let li = document.createElement("li");
    li.textContent = `Highest Score: Level ${level} - ${score}`;
    highestScoreDisplay.innerHTML = ""; // Clear previous highest score display
    highestScoreDisplay.appendChild(li); // Add the updated highest score to the scoreboard
}

function btnPress() {
    //console.log(this);
    let btn = this;
    userFlash(btn);

    
   userColor = btn.getAttribute("id");
   userSeq.push(userColor);

   checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click",btnPress);
}


function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

