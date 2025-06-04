"use strict";

import { Game } from "./core/game.js";
import { CookiesHandler } from "./utils/cookies-handler.js";
import { PlatformUtils } from "./utils/platform-utils.js";

const usernameInput = document.querySelector("#input");
usernameInput.addEventListener("keydown", initGame);
let game = null;

let cookieHandler = new CookiesHandler();

cookieHandler.checkCookies(usernameInput);
PlatformUtils.checkIfMobile();
PlatformUtils.preventTabResizesAndDevTools();

function initGame(event) {
  const body = document.querySelector("body");
  const canvas = document.querySelector("#canvas");
  const introContainer = document.querySelector("#intro-container");

  if (event.key === "Enter") {
    event.preventDefault();

    if (usernameInput.value != "" && usernameInput.value != null) {
      cookieHandler.setCookie("username", usernameInput.value, 365);

      body.style.display = "block";
      canvas.style.display = "block";
      introContainer.style.display = "none";

      game = new Game(canvas);
      game.startGame();

      canvas.addEventListener("click", game.restartGame.bind(game));
    }
  }
}
