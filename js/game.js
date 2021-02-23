// Set the globals values
let globalScorePlayer1 = 0;
let globalScorePlayer2 = 0;
let currentScorePlayer1 = 0;
let currentScorePlayer2 = 0;
let currentPlayer = 1;

// Return the random result of the dice
const randomDice = () => {
    let min = 1;
    let max = 6;
    return min+Math.floor(Math.random()*(max-min+1));
}

// Start un new game and reset the values
const startNewGame = () => {
    globalScorePlayer1 = 0;
    globalScorePlayer2 = 0;
    currentScorePlayer1 = 0;
    currentScorePlayer2 = 0;
    currentPlayer = 1;
}

// The event to launch the dice
let btnRollDice = document.getElementById('rollDice');
btnRollDice.addEventListener('click', () => {
    console.log(randomDice());
});

// The event to start a new game
let btnNewGame = document.getElementById('newGame');
btnNewGame.addEventListener('click', () => {
    startNewGame();
});

