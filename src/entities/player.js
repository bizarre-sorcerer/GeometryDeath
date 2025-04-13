import { GameObject } from "./game-object.js";

export class Player extends GameObject {
  constructor({ x, y, radius, thickness, color, amountOfLives } = {}) {
    super({ x, y });
    this.radius = radius;
    this.thickness = thickness;
    this.amountOfLives = amountOfLives;
    this.color = color;
  }

  isEqual(otherObject) {
    if (this == otherObject) {
      return true;
    } else {
      return false;
    }
  }
}
