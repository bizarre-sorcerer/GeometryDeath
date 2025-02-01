export class Renderer {
  constructor(ctx){
    this.ctx = ctx
  }

  drawBall(ball){
    this.ctx.beginPath()
    this.ctx.strokeStyle = ball.color
    this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false)
    this.ctx.stroke()
  }

  renderBalls(balls){
    for (let ball of balls) {
      this.drawBall(ball);
    }
  }
  
  clearScreen(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }
}