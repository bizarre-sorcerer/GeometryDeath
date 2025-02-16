import { Renderer } from "./renderer.js";
import { Physics } from "./physics.js";
import { Config } from "../utils/config.js";
import { Ball } from "../entities/ball.js";
import { Util } from "../utils/util.js";
import { Player } from "../entities/player.js";

export class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.renderer = new Renderer(this.ctx);
    this.physics = new Physics(true);
    this.gameOngoing = true;

    this.init();
  }

  createballs() {
    let max = Config.radius * 2;

    for (let i = 0; i < Config.ballsAmount; i++) {
      let x = Util.getRandomInt(max, window.innerWidth);
      let y = Util.getRandomInt(max, window.innerHeight);
      let ball = new Ball(
        x,
        y,
        Config.radius,
        Config.dx,
        Config.dy,
        Config.colors[0]
      );

      ball.changeDirectionRandom();
      ball.setRandomColor();
      this.gameObjects.push(ball);
    }
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.gameObjects = [];
    this.points = 0;
    this.ctx.font = Config.font;

    this.player = new Player(10, 10);
    this.gameObjects.push(this.player);

    const self = this;
    this.canvas.addEventListener("mousemove", function (event) {
      self.physics.movePlayer(self.player, event.clientX, event.clientY);
    });

    this.createballs();

    this.startTime = performance.now();
    this.lastTime = performance.now();
  }

  gameLoop = (currentTime) => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const elapsedTime = currentTime - this.startTime;
    this.gameOngoing = this.physics.ongoing;

    if (this.gameOngoing) {
      this.points = Math.floor(elapsedTime / 100);
      this.ctx.strokeText(this.points, this.canvas.width / 2 - 19, 60);

      if (currentTime - this.lastTime >= 2000) {
        if (this.gameObjects.length < Config.maxBalls) {
          this.createballs();
        }
        this.lastTime = currentTime;
      }
      this.renderer.renderFrame(this.gameObjects);
      this.physics.processBallMovements(this.gameObjects);
    } else {
      this.ctx.strokeText(
        `LOL, only ${this.points} points?`,
        this.canvas.width / 2 - 19,
        this.canvas.height / 2
      );
      this.ctx.textBaseline = "middle";
      this.ctx.textAlign = "center";
    }

    requestAnimationFrame(this.gameLoop);
  };

  startGame() {
    this.gameLoop();
  }
}
