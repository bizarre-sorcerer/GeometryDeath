import { Config } from "../utils/config.js";
import { Ball } from "../entities/ball.js";
import { Player } from "../entities/player.js";
import { GameUtils } from "../utils/game-utils.js";

export class Physics {
  movePlayer(player, x, y) {
    player.x = x;
    player.y = y;
  }

  moveBall(ball) {
    if (ball instanceof Ball) {
      ball.x += ball.dx;
      ball.y += ball.dy;
    }
  }

  detectWallCollisions(ball) {
    let rightEdgePos = ball.x + ball.radius;
    let bottomEdgePos = ball.y + ball.radius;
    let changeColor = false;

    if (ball.x < ball.radius) {
      ball.x = ball.radius;
      ball.dx *= -1;
      changeColor = true;
    } else if (rightEdgePos > window.innerWidth) {
      ball.x = window.innerWidth - ball.radius;
      ball.dx *= -1;
      changeColor = true;
    }

    if (ball.y < ball.radius) {
      ball.y = ball.radius;
      ball.dy *= -1;
      changeColor = true;
    } else if (bottomEdgePos > window.innerHeight) {
      ball.y = window.innerHeight - ball.radius;
      ball.dy *= -1;
      changeColor = true;
    }

    if (ball instanceof Ball && changeColor) {
      ball.changeColor();
    }
  }

  calculateDistance(xDistance, yDistance) {
    const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    return distance;
  }

  checkBallsCollision(ball, otherBall) {
    const xDistance = otherBall.x - ball.x;
    const yDistance = otherBall.y - ball.y;
    let distance = this.calculateDistance(xDistance, yDistance);

    return distance < ball.radius + otherBall.radius;
  }

  correctIfBallsOverlap(ball, otherBall) {
    const xDistance = otherBall.x - ball.x;
    const yDistance = otherBall.y - ball.y;
    let distance = this.calculateDistance(xDistance, yDistance);

    const overlap = ball.radius + otherBall.radius - distance;
    const correctionX = (overlap / 2) * (xDistance / distance);
    const correctionY = (overlap / 2) * (yDistance / distance);
    ball.x -= correctionX;
    ball.y -= correctionY;
    otherBall.x += correctionX;
    otherBall.y += correctionY;
  }

  calculateNewBallSpeeds(ball, otherBall) {
    const xDistance = otherBall.x - ball.x;
    const yDistance = otherBall.y - ball.y;
    let distance = this.calculateDistance(xDistance, yDistance);

    const normalVectorX = xDistance / distance;
    const normalVectorY = yDistance / distance;
    const tangentVectorX = -normalVectorY;
    const tangentVectorY = normalVectorX;

    const dpNorm1 = ball.dx * normalVectorX + ball.dy * normalVectorY;
    const dpTan1 = ball.dx * tangentVectorX + ball.dy * tangentVectorY;
    const dpNorm2 = otherBall.dx * normalVectorX + otherBall.dy * normalVectorY;
    const dpTan2 =
      otherBall.dx * tangentVectorX + otherBall.dy * tangentVectorY;

    const newNorm1 = dpNorm2;
    const newNorm2 = dpNorm1;

    let finalVx1 = tangentVectorX * dpTan1 + normalVectorX * newNorm1;
    let finalVy1 = tangentVectorY * dpTan1 + normalVectorY * newNorm1;
    let finalVx2 = tangentVectorX * dpTan2 + normalVectorX * newNorm2;
    let finalVy2 = tangentVectorY * dpTan2 + normalVectorY * newNorm2;

    const mag1 = Math.sqrt(finalVx1 * finalVx1 + finalVy1 * finalVy1);
    const mag2 = Math.sqrt(finalVx2 * finalVx2 + finalVy2 * finalVy2);
    if (mag1 !== 0) {
      finalVx1 = (finalVx1 / mag1) * Config.speed;
      finalVy1 = (finalVy1 / mag1) * Config.speed;
    }
    if (mag2 !== 0) {
      finalVx2 = (finalVx2 / mag2) * Config.speed;
      finalVy2 = (finalVy2 / mag2) * Config.speed;
    }

    ball.dx = finalVx1;
    ball.dy = finalVy1;
    otherBall.dx = finalVx2;
    otherBall.dy = finalVy2;
  }

  processBallPhysics(balls) {
    for (let ball of balls) {
      this.moveBall(ball);
      this.detectWallCollisions(ball);

      if (!balls) return;

      for (let otherBall of balls) {
        if (ball.isEqual(otherBall)) continue;

        if (this.checkBallsCollision(ball, otherBall)) {
          if (ball instanceof Player || otherBall instanceof Player) {
            GameUtils.gameOngoing = false;
          }

          this.correctIfBallsOverlap(ball, otherBall);
          this.calculateNewBallSpeeds(ball, otherBall);

          if (ball instanceof Ball) {
            ball.changeColor();
          }
        }
      }
    }
  }
}
