import { Config } from "../utils/config.js";
import { GameObject } from "./game-object.js";

export class SpecialEffectsObject extends GameObject {
  constructor({ x, y, svgString }) {
    super({ x, y });
    this.svgString = svgString;
    this.init();
  }

  init() {
    this.svgBlob = new Blob([this.svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    this.url = URL.createObjectURL(this.svgBlob);
    this.img = new Image();
    this.img.src = this.url;

    this.width = Config.lifeObjectSize;
    this.height = Config.lifeObjectSize;
  }

  isEqual(otherGameObject) {
    if (this == otherGameObject) {
      return true;
    } else {
      return false;
    }
  }
}
