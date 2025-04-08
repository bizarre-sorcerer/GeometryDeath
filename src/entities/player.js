import { GameObject } from "./game-object.js";
import { Config } from "../utils/config.js";

export class Player extends GameObject {
  constructor({ x, y, radius, thickness, color, amountOfLives } = {}) {
    super({ x, y, color, thickness });
    this.radius = radius;
    this.amountOfLives = amountOfLives;
  }

  isEqual(otherObject) {
    if (this == otherObject) {
      return true;
    } else {
      return false;
    }
  }
}
