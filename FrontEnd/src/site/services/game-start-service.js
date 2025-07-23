import { Game } from "../../game/core/game.js";
import { ValidationUtils } from "../utils/validation-utils.js";
import { AuthClient } from "../api/auth-api.js";
import { CookieUtils } from "../utils/cookie-utils.js";

export class GameStartService {
    game = null;

    prepareGameStart() {
        const usernameInput = document.querySelector("#input");
        usernameInput.addEventListener("keydown", (event) => {
            this.initGame(event, event.target);
        });

        usernameInput.addEventListener("input", (event) => {
            ValidationUtils.isInputValid(event.target);
        });
    }

    initGame(event, usernameInput) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (ValidationUtils.isInputValid(usernameInput)) {
                if (!ValidationUtils.isSignedIn()) {
                    let authClient = new AuthClient();
                    authClient.createGuestAccount(usernameInput.value);
                    CookieUtils.setCookie("username", usernameInput.value, 30);
                } else {
                    // TO DO: authentication
                }

                this.hideHtmlElements();
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
        if (CookieUtils.getCookie("hasSeenTutorial") == "") {
            CookieUtils.setCookie("hasSeenTutorial", true, 7);
            let tutorialContainer = document.querySelector(
                "#tutorial-container"
            );
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
        const header = document.querySelector("#header");
        const canvas = document.querySelector("#canvas");
        const introSection = document.querySelector("#intro-section");

        body.style.display = "block";
        canvas.style.display = "block";
        introSection.style.display = "none";
        header.style.display = "none";
    }
}
