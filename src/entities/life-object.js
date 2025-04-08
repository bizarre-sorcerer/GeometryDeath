import { GameObject } from "./game-object.js";

export class LifeObject extends GameObject {
  constructor({ x, y, radius, thickness, color, fillColor }) {
    super({ x, y, thickness, color });
    this.radius = radius;
    this.fillColor = fillColor;
  }

  isEqual(otherGameObject) {
    if (this == otherGameObject) {
      return true;
    } else {
      return false;
    }
  }
}
