function changeRanking1() {
    document.getElementById("crownWhite").style.display = "none";
    document.getElementById("crownYellow").style.display = "flex";
    document.getElementById("streakText").style.display = "flex";
    document.getElementById("geralText").style.display = "none";
}

function changeRanking2() {
    document.getElementById("crownWhite").style.display = "flex";
    document.getElementById("crownYellow").style.display = "none";
    document.getElementById("streakText").style.display = "none";
    document.getElementById("geralText").style.display = "flex";
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
    // const squares = document.querySelectorAll(".square");
    // squares.forEach((element) => {
    //     element.classList.toggle("dark-square");
    // });
}

const word = "PILHA";

const XCount = 5;
const YCount = 5;

const QWERTY = "QWERTYUIOPASDFGHJKLZXCVBNM";
let squares = [];
let buttons = [];

let guesses = [];
let guess = [];
let cursorPosition = 0;
let guessCount = 0;

function init() {
    buttons = document.querySelectorAll(".keyboardKey");
    buttons.forEach((element, i) => {
        element.onclick = (e) => {
            handleInput(i);
        };
    });
    const lines = document.querySelectorAll(".squareLine");
    lines.forEach((line) => {
        squares.push(line.children);
    });

    const del = document.querySelector(".del");
    del.onclick = (e) => {
        if (cursorPosition > 0) {
            cursorPosition--;
            guess[cursorPosition] = " ";
            updateGuess();
        }
    };

    const enter = document.querySelector(".enter");
    enter.onclick = (e) => {
        if (cursorPosition >= 5) {
            checkGuess();
        } else {
            alert("Incompleto");
        }
    };
}

function handleInput(i) {
    if (cursorPosition >= 5) {
        return;
    }

    guess[cursorPosition] = QWERTY[i];
    cursorPosition++;

    updateGuess();
}

function updateGuess() {
    for (let i = 0; i < XCount; i++) {
        squares[guessCount][i].innerText =
            guess[i] !== undefined ? guess[i] : " ";
    }
}

function updateKeyboard() {
    buttons.forEach((element, index) => {
        let next = false;
        for (let i = 0; i < guesses.length && !next; i++) {
            for (let j = 0; j < guesses[i].length && !next; j++) {
                if (guesses[i][j].letter === QWERTY[index]) {
                    if (guesses[i][j].color === LetterType.RED) {
                        element.style.backgroundColor = LetterType.GREY;
                        element.children[0].style.color = "#757575";
                        element.style.cursor = "default";
                    } else {
                        element.style.backgroundColor = guesses[i][j].color;
                    }

                    if (guesses[i][j].color === LetterType.GREEN) {
                        next = true;
                        break;
                    }

                    if (guesses[i][j].color === LetterType.YELLOW) {
                        next = true;
                        break;
                    }
                }
            }
        }
    });
}

function checkGuess() {
    let guessed = true;
    let lineGuess = [];
    for (let i = 0; i < XCount; i++) {
        if (guess[i] === word[i]) {
            squares[guessCount][i].style.backgroundColor = LetterType.GREEN;
            lineGuess.push({
                letter: guess[i],
                color: LetterType.GREEN,
            });
            continue;
        }

        if (word.includes(guess[i])) {
            squares[guessCount][i].style.backgroundColor = LetterType.YELLOW;
            lineGuess.push({
                letter: guess[i],
                color: LetterType.YELLOW,
            });
        } else {
            squares[guessCount][i].style.backgroundColor = LetterType.RED;
            lineGuess.push({
                letter: guess[i],
                color: LetterType.RED,
            });
        }

        guessed = false;
    }

    guesses.push(lineGuess);
    updateKeyboard();

    if (!guessed) {
        guessCount++;
        cursorPosition = 0;
        guess = [];

        if (guessCount >= YCount) {
            alert("FAIL");
        }
    } else {
        alert("WIN");
    }
}

const LetterType = {
    GREEN: "#88F783",
    YELLOW: "#F2F559",
    RED: "#F5A759",
    GREY: "#CACACA",
};
