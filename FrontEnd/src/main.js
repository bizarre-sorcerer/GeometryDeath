"use strict";

import { PlatformUtils } from "./site/utils/platform-utils.js";
import { GameStartService } from "./site/services/game-start-service.js";
import * as CookieService from "./site/services/cookie-service.js";

let gameStartService = new GameStartService();
gameStartService.prepareGameStart();

CookieService.fillUsernameInputCookies();
CookieService.fillHeaderProfileCookies();

PlatformUtils.preventForbiddenThings();
