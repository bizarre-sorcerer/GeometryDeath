import { Renderer } from "./renderer.js";
import { Physics } from "./physics.js";
import { Config } from "../utils/config.js";
import { Ball } from "../entities/ball.js";
import { Util } from "../utils/util.js";

export class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.renderer = new Renderer(this.ctx);
    this.physics = new Physics();
    this.balls = [];

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
      this.balls.push(ball);
    }
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.font = Config.font;

    this.createballs();

    this.elapsed = 0;
    this.lastTime = performance.now();

    console.log(Config.maxBalls);
  }

  gameLoop = (currentTime) => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeText(
      Math.floor(currentTime / 100),
      this.canvas.width / 2 - 19,
      60
    );

    if (currentTime - this.lastTime >= 2000) {
      if (this.balls.length < Config.maxBalls) {
        this.createballs();
      }
      this.elapsed = 0;
      this.lastTime = currentTime;
    }

    this.renderer.renderFrame(this.balls);
    this.physics.processBallMovements(this.balls);

    requestAnimationFrame(this.gameLoop);
  };
}
