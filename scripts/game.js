let game = {
    score: 0,
    currentGame: [], // Has empty array
    playerMoves: [], // Has empty array
    choices: ["button1", "button2", "button3", "button4"], // Has ID:s in array
};

function newGame() {
    game.currentGame = [];
    game.playerMoves = [];
    game.score = 0;
    showScore();
    addTurn();
};

function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[Math.floor(Math.random() * 4)]);
    // showTurns();
}

function showScore() {
    document.getElementById("score").innerText = game.score;
};

// Always add new objects and functions for export
module.exports = { game, newGame, showScore, addTurn }; // Curly braces needed to export more than one object and function from file