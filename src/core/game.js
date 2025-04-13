import { Renderer } from "./renderer.js";
import { Physics } from "./physics.js";
import { GameUtils } from "../utils/game-utils.js";
import { ShieldObject } from "../entities/shield-object.js";
import { Config } from "../utils/config.js";

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
    GameUtils.createLifeIndicator();

    setTimeout(() => {
      let x = GameUtils.getRandomInt(20, window.innerWidth - 40);
      let y = GameUtils.getRandomInt(20, window.innerHeight - 40);
      let shieldObject = new ShieldObject({
        x: x,
        y: y,
        svgString: Config.shieldSvg,
      });
      GameUtils.allGameObjects.push(shieldObject);
    }, 5000);

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
      this.renderer.renderLoseMessage(GameUtils.loseMessage);
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
