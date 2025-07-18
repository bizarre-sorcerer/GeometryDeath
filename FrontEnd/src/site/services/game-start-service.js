import { Game } from '../../game/core/game.js'
import { ValidationUtils } from '../utils/validation-utils.js'
import { AuthClient } from '../api/auth-api.js'
import { CookieUtils } from '../utils/cookie-utils.js';

export class GameHandler {
  game = null;

  initGame(event, usernameInput) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (ValidationUtils.isInputValid(usernameInput)) {
        if (!ValidationUtils.isSignedIn()){
          let authClient = new AuthClient();
          authClient.createGuestAccount(usernameInput.value);
          CookieUtils.setCookie("username", usernameInput.value, 30);
        } else {
          // TO DO: authentication
        }

        this.hideHtmlElements()
        this.showTutorialOnce();
      }
    }
  }

  startGame() {
    this.game = new Game(canvas);
    this.game.startGame();

    canvas.addEventListener("click", this.game.restartGame.bind(this.game));
  }

  showTutorialOnce() {
    if (CookieUtils.getCookie("hasSeenTutorial") == false) {
      CookieUtils.setCookie("hasSeenTutorial", true, 7);
      let tutorialContainer = document.querySelector("#tutorial-container");
      let skipBtn = document.querySelector("#skip-btn");
      let nextBtn = document.querySelector("#next-btn");

      tutorialContainer.style.display = "block";

      skipBtn.addEventListener("click", () => {
        tutorialContainer.style.display = "none";
        this.startGame();
      });

      nextBtn.addEventListener("click", () => {
        // to do more gifs
        tutorialContainer.style.display = "none";
        this.startGame();
      });
    } else {
      this.startGame();
    }
  }

  hideHtmlElements() {
    const body = document.querySelector("body");
    const canvas = document.querySelector("#canvas");
    const introContainer = document.querySelector("#intro-container");

    body.style.display = "block";
    canvas.style.display = "block";
    introContainer.style.display = "none";
  }
}