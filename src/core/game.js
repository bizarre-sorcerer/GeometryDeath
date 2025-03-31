import { Renderer } from "./renderer.js";
import { Physics } from "./physics.js";
import { GameUtils } from "../utils/game-utils.js";

export class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.renderer = new Renderer(this.ctx);
    this.physics = new Physics();
    this.frameCount = 0;

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

    this.frameCount += 1;
  };

  startGame() {
    this.gameLoop();
  }

  restartGame() {
    console.log("restarting game");
    GameUtils.gameObjects = [];
    GameUtils.points = 0;
    GameUtils.gameOngoing = true;
    GameUtils.createPlayer(this.canvas, this.physics);
  }
}
