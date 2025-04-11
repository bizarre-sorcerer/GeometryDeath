"use strict";

import { Game } from "./core/game.js";
import { GameUtils } from "./utils/game-utils.js";

const body = document.querySelector("body");
const canvas = document.querySelector("#canvas");
const introContainer = document.querySelector("#intro-container");
const input = document.querySelector("#input");
let game = null;

checkIfMobile();
preventTabResizes();

input.addEventListener("keydown", initGame);
document.addEventListener("click", addRestartLogic);

function initGame(event) {
  if (event.key === "Enter") {
    event.preventDefault();

    body.style.display = "block";
    canvas.style.display = "block";
    introContainer.style.display = "none";

    game = new Game(canvas);
    game.startGame();
  }
}

function addRestartLogic() {
  if (!GameUtils.gameOngoing) {
    game.restartGame();
  }
}

function checkIfMobile() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    let mobileContainer = document.querySelector("#mobile-container");
    const messageElement = document.querySelector("#mobile-error-message");

    introContainer.style.display = "none";
    mobileContainer.style.display = "flex";

    messageElement.innerHTML =
      "К сожалению на данный момент игра не поддерживается на мобильных устройствах <br> <br> Попробуйте еще раз на компьютере";
  }
}

function preventTabResizes() {
  let keycodes = [17, 189, 187, 107, 109];

  let target = window.opera ? document.body : document;
  target.addEventListener(
    "keydown",
    (event) => {
      if (keycodes.indexOf(event.keyCode) != -1) {
        event.preventDefault();
      }
      return false;
    },
    !window.opera
  );
}
