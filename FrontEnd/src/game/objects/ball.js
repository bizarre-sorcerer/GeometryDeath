import { GameObject } from "./game-object.js";
import { Config } from "../configs/game-config.js";
import { GameUtils } from "../utils/game-utils.js";

export class Ball extends GameObject {
  constructor({ x, y, radius, dx, dy, thickness, strokeColor }) {
    super({ x, y });
    this.dx = dx;
    this.dy = dy;
    this.thickness = thickness;
    this.radius = radius;
    this.strokeColor = strokeColor;
  }

  // changeDirectionRandom() {
  //   let random = Math.floor(Math.random() * (2 - 1 + 1) + 1);

  //   if (random % 2 === 0) {
  //     this.dx = Config.dx;
  //   } else {
  //     this.dx = Config.dx * -1;
  //   }
  //   if (Math.floor(Math.random() * (2 - 1 + 1) + 1) % 2 === 0) {
  //     this.dy = Config.y;
  //   } else {
  //     this.dy = Config.y * -1;
  //   }
  // }

  setRandomColor() {
    let randomIndex = GameUtils.getRandomInt(0, Config.colors.length);
    this.strokeColor = Config.colors[randomIndex];
  }

  changeColor() {
    let randomIndex = GameUtils.getRandomInt(0, Config.colors.length);
    let currentColor = Config.colors.indexOf(this.strokeColor);
    let nextColor = Config.colors[randomIndex];

    do {
      randomIndex = GameUtils.getRandomInt(0, Config.colors.length);
    } while (currentColor === nextColor);

    this.strokeColor = Config.colors[randomIndex];
  }

  isEqual(otherBall) {
    if (this == otherBall) {
      return true;
    } else {
      return false;
    }
  }
}
