import { Game } from "./core/Game.js";

const canvas = document.querySelector("#canvas");

document.addEventListener("DOMContentLoaded", () => {
    const game = new Game(canvas);
    game.gameLoop();
});

