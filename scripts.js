let dark = false;

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  let squaresText = document.querySelectorAll(".square");
  for (var i = 0; i < squaresText.length; i++) {
    squaresText[i].classList.toggle("dark");
  }
}

const word = "MOUSE";

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

  window.addEventListener("load", function () {
    let fishRed = this.document.getElementById("fishRed");
    let fishBlue = this.document.getElementById("fishBlue");
    let fishYellow = this.document.getElementById("fishYellow");

    let xRange = window.screen.width + 200;
    let yRange = window.screen.height - 200;

    var xPosRed = 0;
    var xPosBlue = 0;
    var xPosYellow = 0;

    var yPosRed = Math.floor(Math.random() * (yRange - 0 + 1)) + 0;
    var yPosBlue = Math.floor(Math.random() * (yRange - 0 + 1)) + 0;
    var yPosYellow = Math.floor(Math.random() * (yRange - 0 + 1)) + 0;

    var speedRed = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    var speedBlue = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
    var speedYellow = Math.floor(Math.random() * (6 - 3 + 1)) + 3;

    var angle = 1;
    var direction = 1;

    function moveFish() {
      if (xPosRed < xRange) {
        fishRed.style.transform =
          "translate(" +
          xPosRed +
          "px, -" +
          yPosRed +
          "px) " +
          "rotate(" +
          angle +
          "deg)";

        fishBlue.style.transform =
          "translate(" +
          xPosBlue +
          "px, -" +
          yPosBlue +
          "px) " +
          "rotate(" +
          angle +
          "deg)";

        fishYellow.style.transform =
          "translate(" +
          xPosYellow +
          "px, -" +
          yPosYellow +
          "px) " +
          "rotate(" +
          angle +
          "deg)";

        xPosRed += speedRed;
        xPosBlue += speedBlue;
        xPosYellow += speedYellow;

        changeAngle();
      }
    }

    function changeAngle() {
      if (direction == 1) {
        angle++;
        if (angle == 7) {
          direction = -1;
        }
      } else {
        angle--;
        if (angle == -5) {
          direction = 1;
        }
      }
    }

    function resetFish() {
      xPosRed = 0;
      xPosBlue = 0;
      xPosYellow = 0;

      yPosRed = Math.floor(Math.random() * (yRange - 0 + 1)) + 0;
      yPosBlue = Math.floor(Math.random() * (yRange - 0 + 1)) + 0;
      yPosYellow = Math.floor(Math.random() * (yRange - 0 + 1)) + 0;

      speedRed = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
      speedBlue = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
      var speedYellow = Math.floor(Math.random() * (6 - 3 + 1)) + 3;

      console.log("red " + speedRed);
      console.log("blue " + speedBlue);
      console.log("yellow " + speedYellow);
    }

    setInterval(moveFish, 10);
    this.setInterval(resetFish, 20000);
  });
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
    squares[guessCount][i].innerText = guess[i] !== undefined ? guess[i] : " ";
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

let ranking = false;

function changeRanking() {
  document.getElementById("crownWhite").style.display =
    " " + (ranking ? "none" : "flex");
  document.getElementById("crownYellow").style.display =
    " " + (ranking ? "flex" : "none");
  document.getElementById("streakText").style.display =
    " " + (ranking ? "flex" : "none");
  document.getElementById("geralText").style.display =
    " " + (ranking ? "none" : "flex");
  ranking = !ranking;
}
