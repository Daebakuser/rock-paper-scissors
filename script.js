const header = document.querySelector('.header');
const welcomeContainer = document.querySelector('.welcome-container');
const welcomeButton = document.querySelector('#welcome-button');
const startContainer = document.querySelector('.start-container');
const body = document.querySelector('body');
const buttonContainer = document.querySelector('.button-container');
const startButton = document.querySelector('#start-button')
const gameContainer = document.querySelector('.game-container');
const result = document.querySelector('.result');
const playerRockButton = document.querySelector('#player-rock');
const playerPaperButton = document.querySelector('#player-paper');
const playerScissorsButton = document.querySelector('#player-scissors');
const computerRockButton = document.querySelector('#computer-rock');
const computerPaperButton = document.querySelector('#computer-paper');
const computerScissorsButton = document.querySelector('#computer-scissors');
const playerScoreDiv = document.querySelector('.player-score');
const computerScoreDiv = document.querySelector('.computer-score');
const gameOverHeader = document.querySelector('#gameover-text')
const gameContainerDiv = document.querySelector('.game-container');
const winnerContainer = document.querySelector('#you-win');
const loserContainer = document.querySelector('#you-lose');
const playAgainButton = document.querySelector('#play-again');


// Function to play main button audio on click
function playClickSound() {
    const buttonClick = document.querySelector("#button-sound");
    buttonClick.play();
}

function playWinningSound(){
    const winnerSound = document.querySelector('#winner-sound');
    winnerSound.play();
}

function playLosingSound(){
    const loserSound = document.querySelector('#loser-sound');
    loserSound.play();
}

const introSound = document.querySelector("#intro-sound");

window.addEventListener('load', ()=>{
    header.style.display = "flex";
    welcomeContainer.style.display = "block";
});

welcomeButton.addEventListener('click', function(){
    playClickSound();
    welcomeContainer.style.display ="none";
    setTimeout(()=>{
        introSound.play();
        header.style.display = "flex";
        header.style.backgroundColor = "#ffffff";
        header.style.border = " 10px double #000000";
        body.style.backgroundColor = "#fa8072";
        startContainer.style.display ="block";
        buttonContainer.style.display ="block";
    },150);    
});


startButton.addEventListener("click", function(){
    introSound.pause();
    startContainer.style.display="none";
    buttonContainer.style.display="none";
    header.style.display="none";
    body.style.backgroundColor ="#666699";
    gameContainer.style.display="block";
    setTimeout(()=>{
        result.textContent="You'll be playing a total five rounds. Remember ties don't count.";
        setTimeout(()=>{
            result.textContent= "Win three or more rounds to become the champion!";
            setTimeout(()=>result.textContent="",1700);
        },2500);
    },700);
});

startButton.addEventListener("click", playClickSound);


const popUpDiv = document.querySelector('.popup');
let playerScore = 0;
let computerScore = 0;
let consecutiveWins = 0;
let numOfRounds = 0;

function  getComputerChoice(){
    const choices = ['ROCK','PAPER','SCISSORS'];
    const choice = choices[Math.floor(Math.random()*choices.length)];
    return choice;
}

function playRound(playerChoice){
    const computerChoice = getComputerChoice();

    if(playerChoice===computerChoice){
        tieRound(playerChoice,computerChoice);
    }
 

    if((playerChoice==="ROCK" && computerChoice==="SCISSORS")||
    (playerChoice==="PAPER" && computerChoice==="ROCK")||
    (playerChoice==="SCISSORS" && computerChoice==="PAPER")){
        winRound(playerChoice,computerChoice);
        numOfRounds++;

    }else if((computerChoice==="ROCK" && playerChoice==="SCISSORS")||
    (computerChoice==="PAPER" && playerChoice==="ROCK")||
    (computerChoice==="SCISSORS" && playerChoice==="PAPER")){
        loseRound(playerChoice,computerChoice);
        numOfRounds++;
    }

    endGame();
}

function endGame(){
    if(numOfRounds===5){
        setTimeout(()=>{
            if(playerScore>computerScore){
                gameContainer.style.display ='none';
                winnerContainer.style.display="block";
                playWinningSound();
                showGameOver();
            }else if(playerScore<computerScore){
                gameContainer.style.display = "none";
                loserContainer.style.display="block";
                playLosingSound();
                showGameOver();
            }
        },500);
    }
}


function showGameOver(){
    gameOverHeader.style.display ="block";
    gameOverHeader.textContent = `Game Over: Player Score: ${playerScore} ,  Computer Score: ${computerScore}`;
    playAgainButton.style.display = "block";
}

playAgainButton.addEventListener('click', ()=>{
    playClickSound();
    gameOverHeader.style.display ="none";
    playAgainButton.style.display = "none";
    winnerContainer.style.display="none";
    loserContainer.style.display="none";
    gameContainer.style.display="block";
    result.textContent ="";
    numOfRounds=0;
    consecutiveWins=0;
    playerScore=0;
    computerScore=0;
    playerScoreDiv.textContent = '0';
    computerScoreDiv.textContent = '0';
    
    endGame();
})

function winRound(playerChoice,computerChoice){
    if(playerChoice==="ROCK"&&computerChoice==="SCISSORS"){
        playerRockButton.classList.add('green-glow');
        computerScissorsButton.classList.add('red-glow');
        result.textContent = `You Win! ${playerChoice} beats ${computerChoice}`;
        setTimeout(()=>{
            playerRockButton.classList.remove('green-glow');
            computerScissorsButton.classList.remove('red-glow');
        },300);
    }else if(playerChoice==="PAPER"&&computerChoice==="ROCK"){
        playerPaperButton.classList.add('green-glow');
        computerRockButton.classList.add('red-glow');
        result.textContent = `You Win! ${playerChoice} beats ${computerChoice}`;
        setTimeout(()=>{
            playerPaperButton.classList.remove('green-glow');
            computerRockButton.classList.remove('red-glow');
        },300);
    }
    else if(playerChoice==="SCISSORS"&&computerChoice==="PAPER"){
        playerScissorsButton.classList.add('green-glow');
        computerPaperButton.classList.add('red-glow');
        result.textContent = `You Win! ${playerChoice} beats ${computerChoice}`;
        setTimeout(()=>{
            playerScissorsButton.classList.remove('green-glow');
            computerPaperButton.classList.remove('red-glow');
        },300);
    }
    playerScore++;
    playerScoreDiv.textContent = playerScore;
    computerScoreDiv.textContent = computerScore;

    consecutiveWins++;
    if(consecutiveWins>=2 && consecutiveWins>=computerScore){
        popUpDiv.style.display ='block';
        setTimeout(()=>{
            popUpDiv.style.display = 'none';
        },1000);
    }
}

function loseRound(playerChoice,computerChoice){
    if(playerChoice==="SCISSORS"&&computerChoice==="ROCK"){
        playerScissorsButton.classList.add('red-glow');
        computerRockButton.classList.add('green-glow');
        result.textContent = `You Lose! ${computerChoice} beats ${playerChoice}`;
        setTimeout(()=>{
            playerScissorsButton.classList.remove('red-glow');
            computerRockButton.classList.remove('green-glow');
        },300);
    }else if(playerChoice==="ROCK"&&computerChoice==="PAPER"){
        playerRockButton.classList.add('red-glow');
        computerPaperButton.classList.add('green-glow');
        result.textContent = `You Lose! ${computerChoice} beats ${playerChoice}`;
        setTimeout(()=>{
            playerRockButton.classList.remove('red-glow');
            computerPaperButton.classList.remove('green-glow');
        },300);
    }
    else if(playerChoice==="PAPER"&&computerChoice==="SCISSORS"){
        playerPaperButton.classList.add('red-glow');
        computerScissorsButton.classList.add('green-glow');
        result.textContent = `You Lose! ${computerChoice} beats ${playerChoice}`;
        setTimeout(()=>{
            playerPaperButton.classList.remove('red-glow');
            computerScissorsButton.classList.remove('green-glow');
        },300);
    }

    computerScore++;
    computerScoreDiv.textContent = computerScore;
    playerScoreDiv.textContent = playerScore;
}

function tieRound(playerChoice,computerChoice){
    if(playerChoice==="ROCK"&&computerChoice==="ROCK"){
        playerRockButton.classList.add('gray-glow');
        computerRockButton.classList.add('gray-glow');
        result.textContent = `It's a tie! Replay Round`;
        setTimeout(()=>{
            playerRockButton.classList.remove('gray-glow');
            computerRockButton.classList.remove('gray-glow');
        },300);
    }else if(playerChoice==="PAPER"&&computerChoice==="PAPER"){
        playerPaperButton.classList.add('gray-glow');
        computerPaperButton.classList.add('gray-glow');
        result.textContent = `It's a tie! Replay Round`;
        setTimeout(()=>{
            playerPaperButton.classList.remove('gray-glow');
            computerPaperButton.classList.remove('gray-glow');
        },300);
    }
    else if(playerChoice==="SCISSORS"&&computerChoice==="SCISSORS"){
        playerScissorsButton.classList.add('gray-glow');
        computerScissorsButton.classList.add('gray-glow');
        result.textContent = `It's a tie! Replay Round`;
        setTimeout(()=>{
            playerScissorsButton.classList.remove('gray-glow');
            computerScissorsButton.classList.remove('gray-glow');
        },300);
    }
}

function playerSelection(){
    playerRockButton.addEventListener('click',()=>{
        playClickSound();
        playRound('ROCK');
    });

    playerPaperButton.addEventListener('click',()=>{
        playClickSound();
        playRound('PAPER');
    });

    playerScissorsButton.addEventListener('click',()=>{
        playClickSound();
        playRound('SCISSORS');
    });
}

playerSelection();
