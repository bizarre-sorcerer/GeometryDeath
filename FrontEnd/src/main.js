"use strict";

import { AuthClient } from "./clients/auth-client.js";
import { Game } from "./core/game.js";
import { CookiesHandler } from "./utils/cookies-handler.js";
import { PlatformUtils } from "./utils/platform-utils.js";

const usernameInput = document.querySelector("#input");
usernameInput.addEventListener("keydown", initGame);
usernameInput.addEventListener("input", isInputValid);
let game = null;

CookiesHandler.setCookie("hasSeenTutorial", false, 7);
CookiesHandler.checkUsernameCookie(usernameInput);
PlatformUtils.checkIfMobile();
PlatformUtils.preventTabResizesAndDevTools();

let authClient = new AuthClient();

function initGame(event) {
  const body = document.querySelector("body");
  const canvas = document.querySelector("#canvas");
  const introContainer = document.querySelector("#intro-container");

  if (event.key === "Enter") {
    event.preventDefault();
    if (isInputValid()) {
      authClient.createGuestAccount(usernameInput.value);
      CookiesHandler.setCookie("username", usernameInput.value, 365);

      body.style.display = "block";
      canvas.style.display = "block";
      introContainer.style.display = "none";

      showTutorialOnce();
    }
  }
}

function isInputValid() {
  if (usernameInput.value == "" || usernameInput.value == null) {
    usernameInput.classList.add("validationError");
    return false;
  } else {
    usernameInput.classList.remove("validationError");
    return true;
  }
}

function startGame() {
  game = new Game(canvas);
  game.startGame();

  canvas.addEventListener("click", game.restartGame.bind(game));
}

function showTutorialOnce() {
  if (CookiesHandler.getCookie("hasSeenTutorial") == false) {
    CookiesHandler.setCookie("hasSeenTutorial", true, 7);
    let tutorialContainer = document.querySelector("#tutorial-container");
    let skipBtn = document.querySelector("#skip-btn");
    let nextBtn = document.querySelector("#next-btn");

    tutorialContainer.style.display = "block";

    skipBtn.addEventListener("click", () => {
      tutorialContainer.style.display = "none";
      startGame();
    });

    nextBtn.addEventListener("click", () => {
      tutorialContainer.style.display = "none";
      startGame();
    });
  } else {
    startGame();
  }
}
