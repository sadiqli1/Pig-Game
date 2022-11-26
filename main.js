"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const current0Sc = document.querySelector("#current--0");
const current1Sc = document.querySelector("#current--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let currentScore = 0;
let activPlayer = 0;
let scores = [0, 0];
let playing = true;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activPlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0Sc.textContent = 0;
  current1Sc.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activPlayer}`).textContent = currentScore;
  activPlayer = activPlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);

    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activPlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    scores[activPlayer] += currentScore;

    document.getElementById(`score--${activPlayer}`).textContent =
      scores[activPlayer];

    if (scores[activPlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activPlayer}`)
        .classList.remove("player--active");
      document
        .querySelector(`.player--${activPlayer}`)
        .classList.add("player--winner");
      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
