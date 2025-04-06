import { GameObject } from "./game-object.js";
import { Config } from "../utils/config.js";

export class Player extends GameObject {
  constructor(
    x,
    y,
    radius = Config.playerSize,
    dx = Config.dx,
    dy = Config.dy,
    color = "#ffffff",
    amountOfLives = 1
  ) {
    super(x, y, dx, dy, color, amountOfLives);
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
