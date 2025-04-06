import { Renderer } from "./renderer.js";
import { Physics } from "./physics.js";
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
    GameUtils.createLifeObjectsPeriodically();
  }

  gameLoop = () => {
    GameUtils.frame += 1;

    this.renderer.clearScreen();

    if (GameUtils.gameOngoing) {
      GameUtils.handlePoints(this.renderer);
      GameUtils.createNewBallsPeriodically();
      this.renderer.renderFrame(GameUtils.allGameObjects);
      this.physics.processPhysics(GameUtils.allGameObjects);
    } else {
      this.renderer.renderLoseMessage();
    }

    requestAnimationFrame(this.gameLoop);
  };

  startGame() {
    this.gameLoop();
  }

  restartGame() {
    GameUtils.allGameObjects = [];
    GameUtils.lifeObjects = [];
    GameUtils.points = 0;
    GameUtils.gameOngoing = true;
    clearInterval(GameUtils.lifeObjectsInterval);

    this.init();
  }
}
