import { Game } from "./core/game.js";

const canvas = document.querySelector("#canvas");

document.addEventListener("click", () => {
  const game = new Game(canvas);
  game.startGame();
});
