import { Config } from "../config.js"
import { Util } from "../Util.js"

export class Physics{
  
  moveBalls(balls){
    for (let i=0; i<balls.length; i++){
      this.moveBall(balls[i]);
      this.detectWallCollision(balls[i])  
      this.detectBallsCollision(balls[i], balls);
    }
  }

  moveBall(ball){
    ball.x += ball.dx
    ball.y += ball.dy
  }

  detectWallCollision(ball){
    let rightEdgePos = ball.x + ball.radius
    let bottomEdgePos = ball.y + ball.radius

    if (rightEdgePos > window.innerWidth || ball.x < ball.radius){
      ball.dx *= -1
      if (ball.x < ball.radius){
        ball.x = ball.radius
      } else if (rightEdgePos > window.innerWidth){
        ball.x = window.innerWidth - ball.radius
      } 

      this.changeColor(ball)
    } 
    if (bottomEdgePos > window.innerHeight || ball.y < ball.radius){
      ball.dy *= -1

      if (ball.y < ball.radius){
        ball.y = ball.radius
      } else if (bottomEdgePos > window.innerHeight){
        ball.y = window.innerHeight - ball.radius
      }

      this.changeColor(ball) 
    }
  }

  detectBallsCollision(ball, balls){
    if (typeof(balls) == 'undefined'){
      return
    }
    
    for (let otherBall of balls){
      if (ball.isEqual(otherBall)){
        continue
      } 

      let distanceX = ball.x - otherBall.x 
      let distanceY = ball.y - otherBall.y 
      
      let distance = Math.sqrt(distanceX*distanceX + distanceY*distanceY)
      const colliding = distance < ball.radius + otherBall.radius;
      if (colliding){
        let overlap = ball.radius + otherBall.radius - distance;
        let pushX = (distanceX / distance) * overlap * 0.5;
        let pushY = (distanceY / distance) * overlap * 0.5;

        ball.x += pushX;
        ball.y += pushY;
        otherBall.x -= pushX;
        otherBall.y -= pushY;

        ball.dx *= -1
        ball.dy *= -1
        otherBall.dx *= -1 
        otherBall.dy *= -1
        
        this.changeColor(ball)
        this.changeColor(otherBall)
      }
    }
  }


  changeColor(ball){
    let randomIndex = Util.getRandomInt(0, Config.colors.length)
    let currentColor = Config.colors.indexOf(ball.color)
    let nextColor = Config.colors[randomIndex]

    do {
      randomIndex = Util.getRandomInt(0, Config.colors.length)
    } while (currentColor === nextColor)

    ball.color = Config.colors[randomIndex]
  }
}