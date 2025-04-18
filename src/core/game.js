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
    this.playerService = new PlayerService(this.gameService);
    this.rendererService = new RendererService(this.ctx, this.gameService);
    this.physicsService = new PhysicsService();

    this.gameService = new GameService(
      this.playerService,
      this.physicsService,
      this.rendererService
    );

    this.gameService.setUpCanvas(this.canvas, this.ctx);
    this.gameService.createPlayer(this.canvas, this.physicsService);
    this.gameService.createMoreBalls();
    this.gameService.keepTrackOfTime();
    this.gameService.createLifeIndicator();
    this.gameService.createLifeObjectsPeriodically();
    this.gameService.createShieldPeriodically();
    this.gameService.handlePhysicsAndPoints();
  }

  gameLoop = () => {
    this.rendererService.clearScreen();

    if (this.gameService.gameOngoing) {
      this.gameService.createNewBallsPeriodically();
      this.gameService.correctPlayerPosition();
      this.rendererService.renderFrame(this.gameService.allGameObjects);
    } else {
      this.rendererService.renderLoseMessage(this.gameService.loseMessage);
    }

    requestAnimationFrame(this.gameLoop);
  };

  startGame() {
    this.gameLoop();
  }

  restartGame() {
    if (!this.gameService.gameOngoing) {
      this.gameService.restoreDefaultState();
      this.init();
    }
  }
}
