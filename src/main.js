import { Game } from "./core/game.js";
import { GameUtils } from "./utils/game-utils.js";

const body = document.querySelector("body");
const canvas = document.querySelector("#canvas");
const introContainer = document.querySelector("#intro-container");

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
  let mobileContainer = document.querySelector("#mobile-container");
  const messageElement = document.querySelector("#mobile-error-message");

  introContainer.style.display = "none";
  mobileContainer.style.display = "flex";

  messageElement.innerHTML =
    "К сожалению на данный момент игра не поддерживается на мобильных устройствах <br> <br> Попробуйте еще раз на компьютере";
}

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    body.style.display = "block";
    canvas.style.display = "block";
    introContainer.style.display = "none";

    const game = new Game(canvas);
    game.startGame();

    document.addEventListener("click", () => {
      if (!GameUtils.gameOngoing) {
        game.restartGame();
      }
    });
  }
});
