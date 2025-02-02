import { Ball } from "../entities/ball.js"
import { Player } from "../entities/player.js"
import { Rect } from "../entities/rect.js"

export class Renderer{
  constructor(ctx){
    this.ctx = ctx
  }

  drawGameObject(gameObject){    
    this.ctx.beginPath()
    this.ctx.strokeStyle = gameObject.color
    this.ctx.lineWidth = gameObject.thickness    

    if (gameObject instanceof Ball){
      this.ctx.arc(gameObject.x, gameObject.y, gameObject.radius, 0, Math.PI * 2, false)
    } else if (gameObject instanceof Rect || gameObject instanceof Player){
      this.ctx.rect(gameObject.x, gameObject.y, gameObject.width, gameObject.height);
    } 
    this.ctx.stroke()
  }

  clearScreen(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }
}