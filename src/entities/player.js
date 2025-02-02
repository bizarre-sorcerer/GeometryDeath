import { GameObject } from "./game-object.js"
import { Config } from "../utils/config.js"

export class Player extends GameObject{
  constructor (x, y,
              width=Config.playerWidth, height=Config.playerHeight,
              dx=Config.dx, dy=Config.dy, 
              thickness="2", color="#ffffff"){
    super(x, y, dx, dy, thickness, color)
    this.width = width
    this.height = height
  }
}