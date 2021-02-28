// Set the globals values
let globalScorePlayer1 = 0;
let globalScorePlayer2 = 0;
let currentScorePlayer1 = 0;
let currentScorePlayer2 = 0;
let currentPlayer = 1;
document.getElementById('player1Name').style.fontWeight = '400';

// Return the random result of the dice
const randomDice = () => {
    let min = 1;
    let max = 6;
    return min+Math.floor(Math.random()*(max-min+1));
}

// Start un new game and reset the values
const startNewGame = () => {
    document.getElementById('winner1').classList.remove('pyro');
    document.getElementById('winner2').classList.remove('pyro');
    globalScorePlayer1 = 0;
    globalScorePlayer2 = 0;
    currentScorePlayer1 = 0;
    currentScorePlayer2 = 0;
    changePlayer(2);

    document.getElementById('player1Current').innerHTML = "0";
    document.getElementById('player2Current').innerHTML = "0";
    document.getElementById('player1Global').innerHTML = "0";
    document.getElementById('player2Global').innerHTML = "0";

    document.querySelector('#dice img').setAttribute('src', 'images/dice0.svg');
    document.getElementById('rollDice').style.display = 'inline-block';
    document.getElementById('hold').style.display = 'inline-block';
}

// Change player
const changePlayer = (playerToChange) => {
    if(playerToChange === 1) {
        currentPlayer = 2;
        document.querySelector('#player1Name ion-icon').classList.remove('active');
        document.getElementById('player1Name').style.fontWeight = 'inherit';

        document.querySelector('#player2Name ion-icon').classList.add('active');
        document.getElementById('player2Name').style.fontWeight = '400';
    } else {
        currentPlayer = 1;
        document.querySelector('#player2Name ion-icon').classList.remove('active');
        document.getElementById('player2Name').style.fontWeight = 'inherit';

        document.querySelector('#player1Name ion-icon').classList.add('active');
        document.getElementById('player1Name').style.fontWeight = '400';
    }
}

// This function will be executed if the current player roll the dice
const rollDice = () => {
    animateCSS('#dice img', 'shakeY').then((message) => {
        let currentDice = randomDice();
        document.querySelector('#dice img').setAttribute('src', 'images/dice'+ currentDice +'.svg');

        // If different than 1 we can add
        if(currentDice !== 1) {
            // Add the value of the dice
            if(currentPlayer === 1) {
                currentScorePlayer1 += currentDice;
                document.getElementById('player1Current').innerHTML = currentScorePlayer1;
                animateCSS('#player1Current', 'zoomIn');
            } else {
                currentScorePlayer2 += currentDice;
                document.getElementById('player2Current').innerHTML = currentScorePlayer2;
                animateCSS('#player2Current', 'zoomIn');
            }
        } else { // Else we reset the score and it's the turn of the other player
            if(currentPlayer === 1) {
                currentScorePlayer1 = 0;
                document.getElementById('player1Current').innerHTML = 0;
                animateCSS('#player1Current', 'zoomIn');
            } else {
                currentScorePlayer2 = 0;
                document.getElementById('player2Current').innerHTML = 0;
                animateCSS('#player2Current', 'zoomIn');
            }
            changePlayer(currentPlayer);
        }
    });
}

// Function to execute if the current player hold
const hold = () => {
    if(currentPlayer === 1) {
        globalScorePlayer1 += currentScorePlayer1;
        currentScorePlayer1 = 0;
        document.getElementById('player1Current').innerHTML = 0;
        document.getElementById('player1Global').innerHTML = globalScorePlayer1;
        animateCSS('#player1Global', 'heartBeat');

        // And the winner is...
        if(globalScorePlayer1 >= 100) {
            document.getElementById('winner1').classList.add('pyro');
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
        animateCSS('#player2Global', 'heartBeat');

        // And the winner is...
        if(globalScorePlayer2 >= 100) {
            document.getElementById('winner2').classList.add('pyro');
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

// Function of animate.css
const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const node = document.querySelector(element);

        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, {once: true});
    });
