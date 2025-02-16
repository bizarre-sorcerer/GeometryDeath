import { Game } from "./core/game.js";

const canvas = document.querySelector("#canvas");
const input = document.querySelector("#input");

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    canvas.style.display = "block";
    input.style.display = "none";
  }
});

document.addEventListener("click", () => {
  const game = new Game(canvas);
  game.startGame();
});
