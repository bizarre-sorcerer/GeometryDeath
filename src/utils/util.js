import { Config } from "./config.js";
import { Ball } from "../entities/ball.js";

export class Util {
  static getRandomInt(min, max) {
    let randomNum = Math.random() * (max - min) + min;
    return Math.ceil(randomNum);
  }

  static createballs() {
    let minimalCoordinate = Config.radius * 2;
    let balls = [];

    for (let i = 0; i < Config.ballsAmount; i++) {
      let x = Util.getRandomInt(minimalCoordinate, window.innerWidth);
      let y = Util.getRandomInt(minimalCoordinate, window.innerHeight);
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
      balls.push(ball);
    }

    return balls;
  }
}
