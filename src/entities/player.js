import { GameObject } from "./game-object.js";
import { Config } from "../utils/config.js";

export class Player extends GameObject {
  constructor(
    x,
    y,
    radius = Config.playerSize,
    dx = Config.dx,
    dy = Config.dy,
    color = "#ffffff"
  ) {
    super(x, y, dx, dy, color);
    this.radius = radius;
  }

  isEqual(otherObject) {
    if (this == otherObject) {
      return true;
    } else {
      return false;
    }
  }
}
