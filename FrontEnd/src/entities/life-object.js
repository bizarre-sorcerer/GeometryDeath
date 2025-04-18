import { SpecialEffectsObject } from "./special-effects-object.js";

export class LifeObject extends SpecialEffectsObject {
  constructor({ x, y, svgString }) {
    super({ x, y, svgString });
  }
}
