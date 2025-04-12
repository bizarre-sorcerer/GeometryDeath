import { GameObject } from "./game-object.js";

export class Player extends GameObject {
  constructor({ x, y, radius, thickness, color, amountOfLives } = {}) {
    super({ x, y, color });
    this.radius = radius;
    this.thickness = thickness;
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
