import { GameObject } from "./game-object.js"

export class Rect extends GameObject {
  constructor (x, y, dx, dy, width=50, height=50, 
              thickness="2", color="#ffffff"){
    super(x, y, dx, dy, thickness, color)
    this.width = width
    this.height = height
  }

  isEqual(otherRect){
    if (this == otherRect){
      return true
    } else {
      return false
    }
  }
}