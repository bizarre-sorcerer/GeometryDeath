export class Renderer {
  constructor(ctx){
    this.ctx = ctx
  }

  drawBall(ball){
    this.ctx.beginPath()
    this.ctx.strokeStyle = 'white'
    this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false)
    this.ctx.stroke()
  }

  animateBall(ball){
    ball.x += ball.dx
    ball.y += ball.dy
    
    if (ball.x + ball.radius > window.innerWidth || ball.x < ball.radius){
      ball.dx *= -1
    } 
    if (ball.y > window.innerHeight - ball.radius || ball.y < ball.radius){
      ball.dy *= -1
    }
  }

  renderBalls(balls){
    for (let ball of balls) {
      this.drawBall(ball);
      this.animateBall(ball);
    }
  }
  
  clearScreen(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }
}