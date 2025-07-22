"use strict";

import { CookieUtils } from "./site/utils/cookie-utils.js";
import { PlatformUtils } from "./site/utils/platform-utils.js";
import { ValidationUtils } from "./site/utils/validation-utils.js";
import { GameHandler } from "./site/services/game-start-service.js";
import { CookieHandler } from "./site/services/cookie-service.js";

let gameHandler = new GameHandler()
let cookieHandler = new CookieHandler() 

cookieHandler.fillUsernameFromCookies()

const usernameInput = document.querySelector("#input");
usernameInput.addEventListener("keydown", (event) => {
  gameHandler.initGame(event, event.target)
});

usernameInput.addEventListener("input", (event) => {
  ValidationUtils.isInputValid(event.target);
});

CookieUtils.setCookie("hasSeenTutorial", false, 7);
PlatformUtils.preventForbiddenThings()