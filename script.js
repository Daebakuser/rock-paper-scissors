function getComputerChoice(){
    const choices=['Rock','Paper','Scissors'];
    const choice=choices[Math.floor(Math.random()*choices.length)];
    return choice;
}

function playRound(playerSelection,computerSelection){
    const playerChoice = playerSelection.charAt(0).toUpperCase() + 
    playerSelection.slice(1).toLowerCase();
    const computerChoice = getComputerChoice();

    if(playerChoice===computerChoice){
        return "It's a tie! Replay round";
    }

    if(playerChoice==='Rock'&& computerChoice==='Scissors' ||
    playerChoice==='Paper' && computerChoice==='Rock' ||
    playerChoice==='Scissors' && computerChoice==='Paper'){
        return `You Win! ${playerChoice} beats ${computerChoice}`;
    }else{
        return `You Lose! ${computerChoice} beats ${playerChoice}`;
    }
}

function game(){
    let playerScore=0;
    let computerScore=0;

    for(let i=1; i<=5;){
        const playerSelection = prompt("Rock, Paper, or Scissors");
        const computerSelection = getComputerChoice();
        const roundResult = playRound(playerSelection,computerSelection);
        console.log(roundResult);

        if(roundResult.includes("You Win!")){
            playerScore++;
            i++;
        }else if(roundResult.includes("You Lose!")){
            computerScore++;
            i++;
        }
    }

    console.log(`Game Over! Player Score:${playerScore} Computer Score:${computerScore}`);
        if(playerScore>computerScore){
            console.log("YOU WON!");
        }else{
            console.log("YOU LOST!");
        }
}

game();