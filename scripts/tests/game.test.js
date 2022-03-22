/**
* @jest-environment jsdom
*/

const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game"); // Always import new objects and functions

jest.spyOn(window, "alert").mockImplementation(() => { }); // Jest spy checks if an alert has been called

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true); // Check that score key exists
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true); // Check that currentGame key exists
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true); // Check that playerMoves key exists
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true); // Check that choices key exists
    });
    test("choices contain correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true); // Check that turnNumber key exists
    });

});

describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerText = "42"; // Set the score to 42 on the DOM
        newGame();
    });
    test("expect data-listener to be true", () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        };
    });
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should be one move in the computer's game array", () => {
        expect(game.currentGame.length).toBe(1); // Contains one move that has been pushed into it
    });
    test("should clear the player moves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test("should display zero for the element with the id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});

describe("gameplay works correctly", () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light"); // Buttons class list should contain the lights class
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns(); // Should reset turnNumber
        expect(game.turnNumber).toBe(0); // Check to see if the turnNumber is zero
    });
    test("should increment the score if the turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]); // Take the one turn from beforeEach function and push into this
        playerTurn();
        expect(game.score).toBe(1); // Expect the score to have increased
    });
    test("should call an alert if the move is wrong", () => {
        game.playerMoves.push("wrong")
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong move!"); // Alert box with text Wrong move is called
    });
});