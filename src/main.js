import { Game } from "./core/game.js";
import { GameUtils } from "./utils/game-utils.js";

const body = document.querySelector("body");
const canvas = document.querySelector("#canvas");
const introContainer = document.querySelector("#intro-container");

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    body.style.display = "block";
    canvas.style.display = "block";
    introContainer.style.display = "none";
  }
});

document.addEventListener("click", () => {
  GameUtils.gameObjects = [];
  GameUtils.points = 0;
  GameUtils.gameOngoing = true;

  const game = new Game(canvas);
  game.startGame();
});
