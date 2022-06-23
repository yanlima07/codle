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
}

const word = "PILHA";

const XCount = 5;
const YCount = 5;

const QWERTY = "QWERTYUIOPASDFGHJKLZXCVBNM";
let squares = [];

let guesses = [];
let guess = [];
let cursorPosition = 0;
let guessCount = 0;

function init() {
    const buttons = document.querySelectorAll(".keyboardKey");
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

function checkGuess() {
    let guessed = true;
    for (let i = 0; i < XCount; i++) {
        if (guess[i] === word[i]) {
            squares[guessCount][i].style.backgroundColor = "#88F783";
            continue;
        }

        if (word.includes(guess[i])) {
            squares[guessCount][i].style.backgroundColor = "#F2F559";
        } else {
            squares[guessCount][i].style.backgroundColor = "#F5A759";
        }

        guessed = false;
    }

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
