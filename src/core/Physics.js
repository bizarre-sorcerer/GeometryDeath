import { Config } from "../config.js"

export class Physics{
  
  moveBall(ball){
    ball.x += ball.dx
    ball.y += ball.dy
    
    this.detectWallCollision(ball)
  }
  
  detectWallCollision(ball){
    if (ball.x + ball.radius > window.innerWidth || ball.x < ball.radius){
      ball.dx *= -1
      this.changeColor(ball)
    } 
    if (ball.y > window.innerHeight - ball.radius || ball.y < ball.radius){
      ball.dy *= -1
      this.changeColor(ball) 
    }
  }

  changeColor(ball){
    let currentColorIndex = Config.colors.indexOf(ball.color)
    ball.color = Config.colors[currentColorIndex+1]
    console.log(currentColorIndex)
  }

  moveBalls(balls){
    for (let ball of balls){
      this.moveBall(ball);
    }
  }
}