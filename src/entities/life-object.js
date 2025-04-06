import { GameObject } from "./game-object.js";
import { Config } from "../utils/config.js";

export class LifeObject extends GameObject {
  constructor(
    x,
    y,
    r = 10,
    dx = Config.dx,
    dy = Config.dy,
    thickness = "2",
    color = "red"
  ) {
    super(x, y, dx, dy, thickness, color);
    this.radius = r;
  }

  isEqual(otherGameObject) {
    if (this == otherGameObject) {
      return true;
    } else {
      return false;
    }
  }
}
