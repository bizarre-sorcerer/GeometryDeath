import { GameObject } from "./game-object.js";
import { PlayerStates } from "./player-states.js";

export class Player extends GameObject {
  constructor({
    x,
    y,
    radius,
    thickness,
    strokeColor,
    fillColor,
    amountOfLives,
  } = {}) {
    super({ x, y });
    this.radius = radius;
    this.thickness = thickness;
    this.amountOfLives = amountOfLives;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.state = PlayerStates.DEFAULT;
  }

  isEqual(otherObject) {
    if (this == otherObject) {
      return true;
    } else {
      return false;
    }
  }
}
