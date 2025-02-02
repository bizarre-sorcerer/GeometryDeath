import { Config } from "../config.js"
import { Util } from "../util.js"

export class Ball {
  constructor (x, y, r, dx, dy, color){
    this.x = x
    this.y = y
    this.radius = r
    this.dx = dx
    this.dy = dy
    this.color = color
  }
  
  changeDirectionRandom(){
    let random = Math.floor(Math.random() * (2 - 1 + 1) + 1)
  
    if (random % 2 === 0){
      this.dx = 4
    } else {
      this.dx = -4
    }
    if (Math.floor(Math.random() * (2 - 1 + 1) + 1) % 2 === 0){
      this.dy = 4
    } else {
      this.dy = -4
    }
  }

  setRandomColor(){
    let randomIndex = Util.getRandomInt(0, Config.colors.length)
    this.color = Config.colors[randomIndex]
  }

  changeColor(){
    let randomIndex = Util.getRandomInt(0, Config.colors.length)
    let currentColor = Config.colors.indexOf(this.color)
    let nextColor = Config.colors[randomIndex]

    do {
      randomIndex = Util.getRandomInt(0, Config.colors.length)
    } while (currentColor === nextColor)

    this.color = Config.colors[randomIndex]
  }

  isEqual(ball){
    if (this == ball){
      return true
    } else {
      return false
    }
  }
}
