//1. classes definition section
class MessageShower {
    //despite this class not being exacltly required, for the purpose of learning it was created
    showMessage(type, message) {
        if(type === "alert"){
            return alert(message);
        } else if(type === "prompt"){
            return prompt(message);
        } else if (type === "confirm"){
            return confirm(message);
        } else {
            return alert("Something happened. Try again")
        }
    }
}

class GameScore{
    constructor() {
        this.playerScore = 0;
        this.computerScore = 0;
    }
    awardPlayer() {
        this.playerScore++;
    }
    awardComputer() {
        this.computerScore++;
    }
}

const Choice = Object.freeze({
    Rock: 'rock',
    Paper: 'paper',
    Scissors: 'scissors'
});

const RoundResult = Object.freeze({
    Draw: "draw",
    Loss: "loss",
    Win: "win"
});

//2. variables
const messageShower = new MessageShower();
const MAX_NUMBER_WINS = 3;

const PLAYER = `
You WIN\n
  O
 \\|/
 / \\ 
`;

const ROBOT = `
AI WINS\n
[o_o]
\\|_|/
 / \\
`;

//3. functions definition sextion
//3.1 instruction section
const welcomeMessage = () => {
    messageShower.showMessage("alert", `not-Welcome to: ${Choice.Rock}, ${Choice.Paper} or ${Choice.Scissors}`);
    messageShower.showMessage("alert", "This game require console in order for you to be defeated");
}

const farewellMessage = (pcWinner, userWins) => {
    if(pcWinner) {
        console.log("You Loooser! I am AI-nvencible.");
        console.log(ROBOT);
    } else if(userWins) {
        console.log("You winner! Next time we'll see  who wins.")
        console.log(PLAYER);
    }
}

const giveInstructions = () => {
    messageShower.showMessage("alert", "To open your console: press f12 > navigate to top line where you see 'Conosle' written > click on it - if not already there. Game will be played typing on dialog boxes and results are displayed in console after each round. You shall follow instructions given.");
    
    console.log("Best of luck - you will need it");
}

//3.3 game section
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function computerPlay() {
    switch (getRandomInt(1, 3)) {
        case 1:
            return Choice.Rock;
        case 2:
            return Choice.Paper;
        case 3:
            return Choice.Scissors;      
    }
}

function returnPlayerSelectionChoice(normalizedPlayerSelection) {
   return [Choice.Rock, Choice.Paper, Choice.Scissors].find((element) => {
        return element === normalizedPlayerSelection;
   });
}

function getPlayerSelection() {
    let normalizedPlayerSelection, playersChoice;
    do{
        const playerSelection = messageShower.showMessage("prompt", `${Choice.Rock}, ${Choice.Paper} or ${Choice.Scissors}? ⮧`);
        
        if(playerSelection == null) {
            throw new Error("Execution aborted");
        }

        normalizedPlayerSelection = trimString(playerSelection);
        
        playersChoice = returnPlayerSelectionChoice(normalizedPlayerSelection);
        if (playersChoice === undefined) {
           messageShower.showMessage("alert", `Nah! Game only works with: ${Choice.Rock}, ${Choice.Paper} or ${Choice.Scissors} ⮧`);
        }
    } while (playersChoice ===  undefined);
    return playersChoice;
}

function trimString(word) {
    let normalized = word.replace(/\s+/g, '').toLowerCase();
    return normalized;
}

function playRound(computerSelection, playerSelection) {
    if(computerSelection === playerSelection){
        return RoundResult.Draw;
    } else if (
            (computerSelection === Choice.Paper && playerSelection === Choice.Rock) ||
            (computerSelection === Choice.Scissors && playerSelection === Choice.Paper) ||
            (computerSelection === Choice.Rock && playerSelection === Choice.Scissors)){
        return RoundResult.Loss;
    } else{
        return RoundResult.Win;
    }
}

function gameResult(gameScore, roundResult){
    if(roundResult === RoundResult.Loss){
                gameScore.awardComputer();
        } else if(roundResult === RoundResult.Win){
            gameScore.awardPlayer();
        }
}

function game() {
    let hasError = false;
    let roundResults = [];
    const gameScore = new GameScore();

    do{
        try {
            messageShower.showMessage("alert", `Lets play round ${roundResults.length+1}`);

            const computerSelection = computerPlay();
            const playerSelection = getPlayerSelection();

            const roundResult = playRound(computerSelection, playerSelection);
            roundResults.push(roundResult);

            gameResult(gameScore, roundResult);
            console.log(`Round ${roundResults.length}: ${roundResult} \n` + `player ${playerSelection} x pc ${computerSelection}\n` + `player ${gameScore.playerScore} x pc ${gameScore.computerScore}`);

        } catch (error) {
            messageShower.showMessage("alert", "Oh no! You finished me, just a looser would do that");
            hasError = true;
        }

    } while ((gameScore.playerScore < MAX_NUMBER_WINS && gameScore.computerScore < MAX_NUMBER_WINS) && !hasError);
    const aiWins = gameScore.computerScore >= MAX_NUMBER_WINS;
    const userWins = gameScore.playerScore >= MAX_NUMBER_WINS;
    farewellMessage(aiWins, userWins);
}

// execution
welcomeMessage();
giveInstructions();
game();
console.info("F5 anytime and we start over again.");