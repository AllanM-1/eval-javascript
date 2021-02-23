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
    changePlayer(2);

    document.getElementById('player1Current').innerHTML = "0";
    document.getElementById('player2Current').innerHTML = "0";
    document.getElementById('player1Global').innerHTML = "0";
    document.getElementById('player2Global').innerHTML = "0";

    document.getElementById('rollDice').style.display = 'inline-block';
    document.getElementById('hold').style.display = 'inline-block';
}

// Change player
const changePlayer = (playerToChange) => {
    if(playerToChange === 1) {
        currentPlayer = 2;
        document.querySelector('#player1Name ion-icon').classList.remove('active');
        document.querySelector('#player2Name ion-icon').classList.add('active');
    } else {
        currentPlayer = 1;
        document.querySelector('#player2Name ion-icon').classList.remove('active');
        document.querySelector('#player1Name ion-icon').classList.add('active');
    }
}

// This function will be executed if the current player roll the dice
const rollDice = () => {
    let currentDice = randomDice();
    document.getElementById('dice').innerHTML = currentDice;

    // If different than 1 we can add
    if(currentDice !== 1) {
        // Add the value of the dice
        if(currentPlayer === 1) {
            currentScorePlayer1 += currentDice;
            document.getElementById('player1Current').innerHTML = currentScorePlayer1;
        } else {
            currentScorePlayer2 += currentDice;
            document.getElementById('player2Current').innerHTML = currentScorePlayer2;
        }
    } else { // Else we reset the score and it's the turn of the other player
        if(currentPlayer === 1) {
            currentScorePlayer1 = 0;
            document.getElementById('player1Current').innerHTML = 0;
        } else {
            currentScorePlayer2 += 0;
            document.getElementById('player2Current').innerHTML = 0;
        }
        changePlayer(currentPlayer);
    }
}

// Function to execute if the current player hold
const hold = () => {
    if(currentPlayer === 1) {
        globalScorePlayer1 += currentScorePlayer1;
        currentScorePlayer1 = 0;
        document.getElementById('player1Current').innerHTML = 0;
        document.getElementById('player1Global').innerHTML = globalScorePlayer1;

        // And the winner is...
        if(globalScorePlayer1 >= 100) {
            alert(`The winner is Player ${currentPlayer}`);
            document.getElementById('rollDice').style.display = 'none';
            document.getElementById('hold').style.display = 'none';
        } else {
            changePlayer(currentPlayer);
        }
    } else {
        globalScorePlayer2 += currentScorePlayer2;
        currentScorePlayer2 = 0;
        document.getElementById('player2Current').innerHTML = 0;
        document.getElementById('player2Global').innerHTML = globalScorePlayer2;

        // And the winner is...
        if(globalScorePlayer2 >= 100) {
            alert(`The winner is Player ${currentPlayer}`);
            document.getElementById('rollDice').style.display = 'none';
            document.getElementById('hold').style.display = 'none';
        } else {
            changePlayer(currentPlayer);
        }
    }

}

// The event to launch the dice
let btnRollDice = document.getElementById('rollDice');
btnRollDice.addEventListener('click', () => {
    rollDice();
});

// The event to start a new game
let btnNewGame = document.getElementById('newGame');
btnNewGame.addEventListener('click', () => {
    startNewGame();
});

// The event to hold
let btnHold = document.getElementById('hold');
btnHold.addEventListener('click', () => {
    hold();
});
