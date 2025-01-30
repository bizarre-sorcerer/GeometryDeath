import { Game } from "./core/Game.js";

const canvas = document.querySelector("#canvas");

document.addEventListener("click", () => {
    const game = new Game(canvas);
    game.gameLoop();
});

