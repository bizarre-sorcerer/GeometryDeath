export class Physics{
  
  moveBall(ball){
    ball.x += ball.dx
    ball.y += ball.dy
  }

  processBallMovements(balls){
    for (let i=0; i<balls.length; i++){
      this.moveBall(balls[i]);
      this.collisonDetection(balls[i], balls)
    }
  }
 
  checkIfBallsOverlap(ball, otherBall, distance, distanceX, distanceY){
    let overlap = ball.radius + otherBall.radius - distance;
    let pushX = (distanceX / distance) * overlap * 0.8;
    let pushY = (distanceY / distance) * overlap * 0.8;

    ball.x += pushX;
    ball.y += pushY;
    otherBall.x -= pushX;
    otherBall.y -= pushY;
  }

  detectWallCollisions(ball){
    let rightEdgePos = ball.x + ball.radius
    let bottomEdgePos = ball.y + ball.radius

    if (ball.x < ball.radius){
      ball.x = ball.radius
      ball.dx *= -1
      ball.changeColor()
    } else if (rightEdgePos > window.innerWidth){
      ball.x = window.innerWidth - ball.radius
      ball.dx *= -1
      ball.changeColor()
    } 

    if (ball.y < ball.radius){
      ball.y = ball.radius
      ball.dy *= -1
      ball.changeColor()
    } else if (bottomEdgePos > window.innerHeight){
      ball.y = window.innerHeight - ball.radius
      ball.dy *= -1
      ball.changeColor()
    }
  }

  detectBallCollisions(ball, balls){
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
        this.checkIfBallsOverlap(ball, otherBall, distance, distanceX, distanceY)

        ball.dx *= -1
        ball.dy *= -1
        otherBall.dx *= -1 
        otherBall.dy *= -1

        ball.changeColor()
        ball.changeColor()
      }
    }
  }

  collisonDetection(ball, balls){
    this.detectWallCollisions(ball)  
    this.detectBallCollisions(ball, balls);
  }
}