"use strict";

import { PlatformUtils } from "./site/utils/platform-utils.js";
import { GameStartService } from "./site/services/game-start-service.js";
import { CookieService } from "./site/services/cookie-service.js";

let gameStartService = new GameStartService();
let cookieService = new CookieService();

if (window.location.href == "http://localhost:5173/GeometryDeath/") {
    gameStartService.prepareGameStart();
    cookieService.fillUsernameInputCookies();
    cookieService.fillHeaderProfileCookies();
} else {
    cookieService.fillHeaderProfileCookies();
}

PlatformUtils.preventForbiddenThings();
