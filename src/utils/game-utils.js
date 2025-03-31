import { Config } from "./config.js";
import { Ball } from "../entities/ball.js";
import { Player } from "../entities/player.js";

export class GameUtils {
  static gameObjects = [];
  static player;
  static points = 0;
  static gameOngoing = true;
  static gameInitTimeStamp;
  static lastTimeBallsAdded;

  static setUpCanvas(canvas, ctx) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.font = Config.font;
  }

  static getRandomInt(min, max) {
    let randomNum = Math.random() * (max - min) + min;
    return Math.ceil(randomNum);
  }

  static createMoreBalls() {
    let minimalCoordinate = Config.radius * 2;

    for (let i = 0; i < Config.ballsAmount; i++) {
      let x = GameUtils.getRandomInt(minimalCoordinate, window.innerWidth);
      let y = GameUtils.getRandomInt(minimalCoordinate, window.innerHeight);
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

  static createPlayer(canvas, physics) {
    GameUtils.player = new Player(10, 10);
    GameUtils.gameObjects.push(this.player);

    canvas.addEventListener("mousemove", function (event) {
      physics.movePlayer(GameUtils.player, event.clientX, event.clientY);
    });
  }

  static handlePoints(renderer) {
    GameUtils.points += 0.3;
    renderer.renderPoints(GameUtils.points);
  }

  static createNewBallsPeriodically() {
    if (performance.now() - GameUtils.lastTimeBallsAdded >= 2000) {
      if (GameUtils.gameObjects.length < Config.maxBalls) {
        GameUtils.createMoreBalls();
      }
      GameUtils.lastTimeBallsAdded = performance.now();
    }
  }

  static keepTrackOfTime() {
    GameUtils.gameInitTimeStamp = performance.now();
    GameUtils.lastTimeBallsAdded = performance.now();
  }
}
