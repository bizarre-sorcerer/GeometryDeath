import { Game } from "./core/game.js";

const body = document.querySelector("body");
const canvas = document.querySelector("#canvas");
const introContainer = document.querySelector("#intro-container");

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    body.style.display = "block";
    canvas.style.display = "block";
    introContainer.style.display = "none";

    let game = new Game(canvas);
    game.startGame();

    document.addEventListener("click", () => {
      game = null;
      const newGame = new Game(canvas);
      newGame.startGame();
    });
  }
});
