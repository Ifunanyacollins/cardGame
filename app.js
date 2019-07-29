// count to check how card has been selected
let countClick = 0;
let firstGuess = "";
let secondGuess = "";
let numberOfGuessed = 0;
let delay = 1200;
const min = document.getElementById("min");
const sec = document.getElementById("sec");
const firstmin = document.getElementById("firstmin");
const firstsec = document.getElementById("firstsec");
const moves = document.getElementById("moves");
// Card data (Name of mario and img)
const cardsArray = [
  {
    name: "shell",
    img: "img/ant.png"
  },
  {
    name: "star",
    img: "img/black.png"
  },
  {
    name: "bobomb",
    img: "img/skylar.png"
  },
  {
    name: "mario",
    img: "img/iron-man.png"
  },
  {
    name: "luigi",
    img: "img/doctor.png"
  },
  {
    name: "peach",
    img: "img/cat.png"
  },
  {
    name: "1up",
    img: "img/spider.png"
  },
  {
    name: "huk",
    img: "img/huk.png"
  }
];

const initStart = () => {
  //I want to join the main arrary with another to make a new arrary of 24 items
  let gameGrid = cardsArray.concat(cardsArray);
  const game = document.getElementById("game");
  const grid = document.createElement("section");
  grid.setAttribute("class", "grid");
  gameGrid.forEach(item => {
    // Create card element with the name dataset
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = item.name;
    card.style.backgroundImage = `url(${item.img})`;

    // Append card to grid, and front and back to each card

    grid.appendChild(card);
    game.appendChild(grid);
  });
};

const gameEngine = () => {
  displayGame();
};

const displayGame = () => {
  countDown(min, sec);
  // Grab the div with an id of root
  const game = document.getElementById("game");
  const gridx = document.querySelector(".grid");
  gridx.remove();
  // Create a section with a class of grid
  const grid = document.createElement("section");
  grid.setAttribute("class", "grid");

  // Append the grid section to the game div
  game.appendChild(grid);

  //I want to join the main arrary with another to make a new arrary of 24 items
  let gameGrid = cardsArray.concat(cardsArray);

  // Randomize game grid on each load
  gameGrid.sort(() => 0.5 - Math.random());
  // For each item in the cardsArray array...
  gameGrid.forEach(item => {
    // Create card element with the name dataset
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = item.name;

    // Create front of card
    const front = document.createElement("div");
    front.classList.add("front");

    // Create back of card, which contains
    const back = document.createElement("div");
    back.classList.add("back");
    back.style.backgroundImage = `url(${item.img})`;

    // Append card to grid, and front and back to each card
    card.appendChild(front);
    card.appendChild(back);
    grid.appendChild(card);
  });
  listenForClick(grid);
};

const listenForClick = grid => {
  // Add event listener to grid
  grid.addEventListener("click", function(event) {
    // The event target is our clicked item
    let clicked = event.target;

    // Do not allow the grid section itself to be selected; only select divs inside the grid
    if (
      clicked.nodeName === "SECTION" ||
      clicked.classList[1] == "selected" ||
      clicked.parentNode.classList.contains("selected")
    ) {
      return;
    }

    // Add selected class
    if (countClick < 2) {
      clicked.classList.add("selected");
      countClick++;
      if (countClick === 1) {
        firstGuess = clicked.parentNode.dataset.name;
        console.log(firstGuess);
        clicked.parentNode.classList.add("selected");
      } else {
        secondGuess = clicked.parentNode.dataset.name;
        console.log(secondGuess);
        clicked.parentNode.classList.add("selected");
      }
      // If both guesses are not empty...
      if (firstGuess !== "" && secondGuess !== "") {
        // and the first guess matches the second match...
        if (firstGuess === secondGuess) {
          // run the match function
          setTimeout(Match, delay);
          setTimeout(resetGuesses, delay);
          moves.textContent++;
          numberOfGuessed++;
        } else {
          setTimeout(resetGuesses, delay);
          moves.textContent++;
        }
      }
    }
  });
};

const Match = () => {
  var selected = document.querySelectorAll(".selected");
  selected.forEach(card => {
    card.classList.add("match");
  });
};

const resetGuesses = () => {
  firstGuess = "";
  secondGuess = "";
  countClick = 0;

  var selected = document.querySelectorAll(".selected");
  selected.forEach(card => {
    card.classList.remove("selected");
  });
};

const countDown = (min, sec) => {
  setInterval(function() {
    if (sec.textContent >= 60) {
      sec.textContent = 0;
      min.textContent++;
      resetGuesses();
      const isRestart = confirm(
        `Game over! you guessed ${numberOfGuessed} avengers, Play again?`
      );
      if (isRestart) {
        location.reload();
      } else {
        return;
      }
    }
    if (sec.textContent >= 9) {
      firstsec.style.display = "none";
    }
    if (min.textContent >= 9) {
      firstmin.style.display = "none";
    }
    sec.textContent++;
  }, 1000);
};

const initBtn = document.getElementById("init");
initBtn.addEventListener("click", gameEngine);
initStart();
