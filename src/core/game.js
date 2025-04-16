import { PlayerService } from "../services/player-service.js";
import { RendererService } from "../services/renderer-service.js";
import { PhysicsService } from "../services/physics-service.js";
import { GameUtils } from "../utils/game-utils.js";

export class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;

    this.init();
  }

  init() {
    this.ctx = this.canvas.getContext("2d");
    this.playerService = new PlayerService();
    this.renderer = new RendererService(this.ctx);
    this.physics = new PhysicsService(this.playerService);

    GameUtils.setUpCanvas(this.canvas, this.ctx);
    GameUtils.createPlayer(this.canvas, this.physics);
    GameUtils.createMoreBalls();
    GameUtils.keepTrackOfTime();
    GameUtils.createLifeObjectsPeriodically();
    GameUtils.createLifeIndicator();
    GameUtils.createShield();

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
      clearInterval(GameUtils.shieldInterval);
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
