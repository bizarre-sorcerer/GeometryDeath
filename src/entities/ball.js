import { GameObject } from "./game-object.js";
import { Config } from "../utils/config.js";
import { GameUtils } from "../utils/game-utils.js";

export class Ball extends GameObject {
  constructor({ x, y, radius, dx, dy, thickness, color }) {
    super({ x, y, thickness, color });
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }

  changeDirectionRandom() {
    let random = Math.floor(Math.random() * (2 - 1 + 1) + 1);

    if (random % 2 === 0) {
      this.dx = 4;
    } else {
      this.dx = -4;
    }
    if (Math.floor(Math.random() * (2 - 1 + 1) + 1) % 2 === 0) {
      this.dy = 4;
    } else {
      this.dy = -4;
    }
  }

  setRandomColor() {
    let randomIndex = GameUtils.getRandomInt(0, Config.colors.length);
    this.color = Config.colors[randomIndex];
  }

  changeColor() {
    let randomIndex = GameUtils.getRandomInt(0, Config.colors.length);
    let currentColor = Config.colors.indexOf(this.color);
    let nextColor = Config.colors[randomIndex];

    do {
      randomIndex = GameUtils.getRandomInt(0, Config.colors.length);
    } while (currentColor === nextColor);

    this.color = Config.colors[randomIndex];
  }

  isEqual(otherBall) {
    if (this == otherBall) {
      return true;
    } else {
      return false;
    }
  }
}
