import { Game } from "./core/game.js";

const canvas = document.querySelector("#canvas");
const introContainer = document.querySelector("#intro-container");

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    canvas.style.display = "block";
    introContainer.style.display = "none";
  }
});

document.addEventListener("click", () => {
  const game = new Game(canvas);
  game.startGame();
});
