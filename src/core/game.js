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

    let self = this;
    this.physicsAndPointsInterval = setInterval(function () {
      GameUtils.points += 0.35;
      self.physics.processPhysics(GameUtils.allGameObjects);
    }, 15);
  }

  gameLoop = () => {
    this.renderer.clearScreen();

    if (GameUtils.gameOngoing) {
      GameUtils.createNewBallsPeriodically();
      GameUtils.correctPlayerPosition();
      this.renderer.renderFrame(GameUtils.allGameObjects);
    } else {
      clearInterval(GameUtils.lifeObjectsInterval);
      clearInterval(this.physicsAndPointsInterval);
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

    this.init();
  }
}
