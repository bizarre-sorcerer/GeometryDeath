import { Renderer } from "./renderer.js";
import { Physics } from "./physics.js";
import { Config } from "../utils/config.js";
import { Util } from "../utils/util.js";
import { Player } from "../entities/player.js";

export class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.renderer = new Renderer(this.ctx);
    this.physics = new Physics(true);
    this.gameOngoing = true;
    this.points = 0;

    this.init();
  }

  addNewBalls() {
    let starterBalls = Util.createballs();
    starterBalls.forEach((ball) => this.gameObjects.push(ball));
  }

  createPlayer() {
    this.player = new Player(10, 10);
    this.gameObjects.push(this.player);

    const self = this;
    this.canvas.addEventListener("mousemove", function (event) {
      self.physics.movePlayer(self.player, event.clientX, event.clientY);
    });
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.gameObjects = [];
    this.points = 0;
    this.ctx.font = Config.font;

    this.createPlayer();
    this.addNewBalls();

    this.gameInitTimeStamp = performance.now();
    this.timeSinceBallsWereAdded = performance.now();
  }

  calculateAndRenderPoints() {
    this.points += 1;
    this.renderer.renderPoints(this.points);
  }

  createNewBallsPeriodically() {
    if (performance.now() - this.timeSinceBallsWereAdded >= 2000) {
      if (this.gameObjects.length < Config.maxBalls) {
        this.addNewBalls();
      }
      this.timeSinceBallsWereAdded = performance.now();
    }
  }

  gameLoop = () => {
    this.renderer.clearScreen();

    if (this.physics.ongoing) {
      this.calculateAndRenderPoints();
      this.renderer.renderFrame(this.gameObjects);
      this.physics.processBallPhysics(this.gameObjects);
      this.createNewBallsPeriodically();
    } else {
      this.renderer.renderLoseMessage(this.points);
    }

    requestAnimationFrame(this.gameLoop);
  };

  startGame() {
    this.gameLoop();
  }
}
