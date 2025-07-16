import { Config } from "../utils/config.js";
import { GameUtils } from "../utils/game-utils.js";
import { Player } from "../entities/player.js";
import { Ball } from "../entities/ball.js";
import { PlayerStates } from "../entities/player-states.js";
import { LifeObject } from "../entities/life-object.js";
import { ShieldObject } from "../entities/shield-object.js";

export class GameService {
  constructor(physicsService, rendererService) {
    this.physicsService = physicsService;
    this.rendererService = rendererService;
    this.init();
  }

  handleDependencyInjections() {
    this.physicsService.setGameService(this);
    this.physicsService.setPlayerService(this.playerService);

    this.rendererService.setGameService(this);
  }

  init() {
    this.handleDependencyInjections();

    this.gameOngoing = true;
    this.player;
    this.shieldAvailable = false;
    this.allGameObjects = [];
    this.lifeObjects = [];
    this.balls = [];
    this.points = 0;
    this.lifeIndicator;
    this.gameInitTimeStamp;
    this.lastTimeBallsAdded;
    this.loseMessage;

    this.lifeObjectsInterval;
    this.physicsAndPointsInterval;
  }

  setUpCanvas(canvas, ctx) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.font = Config.font;

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.font = Config.font;
    });
  }

  createMoreBalls() {
    let minimalCoordinate = Config.radius * 2;

    for (let i = 0; i < Config.ballsAmount; i++) {
      let x = GameUtils.getRandomInt(minimalCoordinate, window.innerWidth);
      let y = GameUtils.getRandomInt(minimalCoordinate, window.innerHeight);
      let ball = new Ball({
        x: x,
        y: y,
        radius: Config.radius,
        dx: Config.dx,
        dy: Config.dy,
        thickness: Config.thickness,
        strokeColor: Config.colors[0],
      });

      // ball.changeDirectionRandom();
      ball.setRandomColor();
      this.allGameObjects.push(ball);
      this.balls.push(ball);
    }
  }

  createNewBallsPeriodically() {
    if (performance.now() - this.lastTimeBallsAdded >= Config.newBallInterval) {
      if (this.allGameObjects.length < Config.maxBalls) {
        this.createMoreBalls();
      }
      this.lastTimeBallsAdded = performance.now();
    }
  }

  createPlayer(canvas, physics) {
    this.player = new Player({
      x: 10,
      y: 10,
      radius: Config.playerSize,
      thickness: Config.thickness,
      strokeColor: Config.defaultStrokeColor,
      fillColor: Config.defaultFillColor,
      amountOfLives: Config.defaultAmountOfLives,
      state: PlayerStates.DEFAULT,
    });
    this.player.setGameService(this);
    this.allGameObjects.push(this.player);

    let self = this;
    canvas.addEventListener("mousemove", function (event) {
      physics.movePlayer(self.player, event.clientX, event.clientY);
    });
  }

  correctPlayerPosition() {
    if (this.player.x + this.player.radius > window.innerWidth) {
      this.player.x = window.innerWidth - this.player.radius;
    } else if (this.player.y + this.player.radius > window.innerHeight) {
      this.player.y = window.innerHeight - this.player.radius;
    }
  }

  keepTrackOfTime() {
    this.gameInitTimeStamp = performance.now();
    this.lastTimeBallsAdded = performance.now();
  }

  createLifeIndicator() {
    let lifeObject = new LifeObject({
      x: null,
      y: null,
      thickness: 0,
      svgString: Config.lifeSvg,
    });

    this.lifeIndicator = lifeObject;
  }

  handlePhysicsAndPoints() {
    let self = this;
    this.physicsAndPointsInterval = setInterval(() => {
      self.points += 0.4;
      this.physicsService.processPhysics(this.allGameObjects);
    }, 15);
  }

  createLifeObjectsPeriodically() {
    let self = this;
    this.lifeObjectsInterval = setInterval(function () {
      let playerHasMaxAmountOfLives =
        self.lifeObjects.length >=
        Config.maxAmountOfLives - self.player.amountOfLives;

      if (playerHasMaxAmountOfLives) {
        return;
      }
      let maxNeededAmount =
        Config.maxAmountOfLives -
        self.player.amountOfLives -
        self.lifeObjects.length;

      let amountToCreate = Math.min(2, maxNeededAmount);

      for (let i = 0; i < amountToCreate; i++) {
        let x = GameUtils.getRandomInt(10, window.innerWidth);
        let y = GameUtils.getRandomInt(10, window.innerHeight);

        let lifeObject = new LifeObject({
          x: x,
          y: y,
          svgString: Config.lifeSvg,
        });

        self.allGameObjects.push(lifeObject);
        self.lifeObjects.push(lifeObject);
      }
    }, 3000);
  }

  createShieldWithDelay() {
    setTimeout(() => {
      if (!this.shieldAvailable) {
        let x = GameUtils.getRandomInt(20, window.innerWidth - 40);
        let y = GameUtils.getRandomInt(20, window.innerHeight - 40);
        let shieldObject = new ShieldObject({
          x: x,
          y: y,
          svgString: Config.shieldSvg,
        });
        this.allGameObjects.push(shieldObject);
        this.shieldAvailable = true;
      }
    }, Config.shieldAppereanceDelay);
  }

  removeGameObject(gameObject, gameObjectsArray) {
    let index = gameObjectsArray.indexOf(gameObject);
    gameObjectsArray.splice(index, 1);
  }

  clearIntervals() {
    clearInterval(this.lifeObjectsInterval);
    clearInterval(this.physicsAndPointsInterval);
  }

  restoreDefaultState() {
    if (!this.gameOngoing) {
      this.allGameObjects = [];
      this.lifeObjects = [];
      this.points = 0;
      this.gameOngoing = true;
    }
  }

  endGame() {
    this.clearIntervals();
    this.restoreDefaultState();
    this.gameOngoing = false;
    this.loseMessage = `LOL, only ${Math.ceil(this.points)} points?`;
  }
}
