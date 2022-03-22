let game = {
    score: 0, // Has default value zero
    currentGame: [], // Has empty array
    playerMoves: [], // Has empty array
    turnNumber: 0, // Has default value zero
    lastButton: "",
    turnInProgress: false,
    choices: ["button1", "button2", "button3", "button4"], // Has ID:s in array
};

function newGame() {
    game.currentGame = [];
    game.playerMoves = [];
    game.score = 0;
    for (let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") !== "true") { // Ask if the attribute is not true
            circle.addEventListener("click", (e) => {
                if (game.currentGame.length > 0 && !game.turnInProgress) {
                    let move = e.target.getAttribute("id"); // Get target ID on click, and store in move
                    game.lastButton = move; // Stores move in lastButton
                    lightsOn(move); // Illuminate circle
                    game.playerMoves.push(move); // Push move into game.playerMoves
                    playerTurn(); // Call playerTurn function
                };
            });
            circle.setAttribute("data-listener", "true");
        };
    };
    showScore();
    addTurn();
};

function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[Math.floor(Math.random() * 4)]);
    showTurns();
};

function showScore() {
    document.getElementById("score").innerText = game.score;
};

function lightsOn(circ) { // Function will be called with the ID of one of the circles
    document.getElementById(circ).classList.add("light"); // The class of light will be added to appropriate circle
    setTimeout(() => { // Set timeout to remove light class after 400 milliseconds
        document.getElementById(circ).classList.remove("light");
    }, 400);
};

function showTurns() {
    game.turnInProgress = true;
    game.turnNumber = 0;
    let turns = setInterval(() => { // Interval is set
        lightsOn(game.currentGame[game.turnNumber]); // Calling lightsOn function to turn lights on
        game.turnNumber++; // Increment game.turnNumber
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns); // Sequence is done, so interval can be cleared and lights turned off
            game.turnInProgress = false;
        };
    }, 800);
}

function playerTurn() {
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length === game.playerMoves.length) { // Means at end of sequence and player got all correct
            game.score++; // Increment score
            showScore();
            addTurn();
        }
    } else {
        alert("Wrong move!");
        newGame();
    }
}

// Always add new objects and functions for export
module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn }; // Curly braces needed to export more than one object and function from file