"use strict";

import { Game } from "./core/game.js";
import { checkCookies, setCookie } from "./utils/cookies-utils.js";
import {
  checkIfMobile,
  preventTabResizesAndDevTools,
} from "./utils/platform-utils.js";
import { handleAuth } from "./utils/auth-utils.js";

const usernameInput = document.querySelector("#input");
usernameInput.addEventListener("keydown", initGame);
let game = null;

checkCookies(usernameInput);
checkIfMobile();
preventTabResizesAndDevTools();

function initGame(event) {
  const body = document.querySelector("body");
  const canvas = document.querySelector("#canvas");
  const introContainer = document.querySelector("#intro-container");

  if (event.key === "Enter") {
    event.preventDefault();

    if (usernameInput.value != "" && usernameInput.value != null) {
      setCookie("username", usernameInput.value, 365);
      // handleAuth(usernameInput.value);

      body.style.display = "block";
      canvas.style.display = "block";
      introContainer.style.display = "none";

      game = new Game(canvas);
      game.startGame();

      canvas.addEventListener("click", game.restartGame.bind(game));
    }
  }
}
