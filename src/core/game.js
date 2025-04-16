import { PlayerService } from "../services/player-service.js";
import { RendererService } from "../services/renderer-service.js";
import { PhysicsService } from "../services/physics-service.js";
import { GameService } from "../services/game-service.js";

export class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext("2d");

    this.init();
  }

  init() {
    this.gameService = new GameService();
    this.playerService = new PlayerService(this.gameService);
    this.renderer = new RendererService(this.ctx, this.gameService);
    this.physics = new PhysicsService(this.playerService, this.gameService);

    this.gameService.setUpCanvas(this.canvas, this.ctx);
    this.gameService.createPlayer(this.canvas, this.physics);
    this.gameService.createMoreBalls();
    this.gameService.keepTrackOfTime();
    this.gameService.createLifeIndicator();
    this.gameService.createLifeObjectsPeriodically();
    this.gameService.createShieldPeriodically();

    let self = this;
    this.physicsAndPointsInterval = setInterval(() => {
      self.gameService.points += 0.35;
      self.physics.processPhysics(this.gameService.allGameObjects);
    }, 15);
  }

  gameLoop = () => {
    this.renderer.clearScreen();

    if (this.gameService.gameOngoing) {
      this.gameService.createNewBallsPeriodically();
      this.gameService.correctPlayerPosition();
      this.renderer.renderFrame(this.gameService.allGameObjects);
    } else {
      clearInterval(this.gameService.lifeObjectsInterval);
      clearInterval(this.gameService.shieldInterval);
      clearInterval(this.physicsAndPointsInterval);
      this.renderer.renderLoseMessage(this.gameService.loseMessage);
    }

    requestAnimationFrame(this.gameLoop);
  };

  startGame() {
    this.gameLoop();
  }

  restartGame() {
    this.gameService.restoreDefaultState();

    this.init();
  }
}
