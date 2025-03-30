import { Renderer } from "./renderer.js";
import { Physics } from "./physics.js";
import { Config } from "../utils/config.js";
import { GameUtils } from "../utils/game-utils.js";

export class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.renderer = new Renderer(this.ctx);
    this.physics = new Physics();

    this.init();
  }

  init() {
    GameUtils.setUpCanvas(this.canvas, this.ctx);
    GameUtils.createPlayer(this.canvas, this.physics);
    GameUtils.createMoreBalls();
    GameUtils.keepTrackOfTime();
  }

  gameLoop = () => {
    this.renderer.clearScreen();

    if (GameUtils.gameOngoing) {
      GameUtils.handlePoints(this.renderer);
      GameUtils.createNewBallsPeriodically();
      this.renderer.renderFrame(GameUtils.gameObjects);
      this.physics.processBallPhysics(GameUtils.gameObjects);
    } else {
      this.renderer.renderLoseMessage();
    }

    requestAnimationFrame(this.gameLoop);
  };

  startGame() {
    this.gameLoop();
  }
}
