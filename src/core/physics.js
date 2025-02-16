import { Config } from "../utils/config.js";
import { Ball } from "../entities/ball.js";
import { Player } from "../entities/player.js";

export class Physics {
  constructor(ongoing) {
    this.ongoing = ongoing;
  }

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

  processBallMovements(balls) {
    for (let i = 0; i < balls.length; i++) {
      this.moveBall(balls[i]);
      this.processCollisions(balls[i], balls);
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

  checkIfBallsOverlap(ball, otherBall, distance, distanceX, distanceY) {
    let overlap = ball.radius + otherBall.radius - distance;
    let pushX = (distanceX / distance) * overlap * 0.8;
    let pushY = (distanceY / distance) * overlap * 0.8;

    ball.x += pushX;
    ball.y += pushY;
    otherBall.x -= pushX;
    otherBall.y -= pushY;
  }

  detectBallCollisions(ball, balls) {
    if (!balls) return;

    for (let otherBall of balls) {
      if (ball.isEqual(otherBall)) continue;

      const dx = otherBall.x - ball.x;
      const dy = otherBall.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < ball.radius + otherBall.radius) {
        if (ball instanceof Player || otherBall instanceof Player) {
          this.ongoing = false;
        }

        const overlap = ball.radius + otherBall.radius - distance;
        const correctionX = (overlap / 2) * (dx / distance);
        const correctionY = (overlap / 2) * (dy / distance);
        ball.x -= correctionX;
        ball.y -= correctionY;
        otherBall.x += correctionX;
        otherBall.y += correctionY;

        const nx = dx / distance;
        const ny = dy / distance;
        const tx = -ny;
        const ty = nx;

        const dpNorm1 = ball.dx * nx + ball.dy * ny;
        const dpTan1 = ball.dx * tx + ball.dy * ty;
        const dpNorm2 = otherBall.dx * nx + otherBall.dy * ny;
        const dpTan2 = otherBall.dx * tx + otherBall.dy * ty;

        const newNorm1 = dpNorm2;
        const newNorm2 = dpNorm1;

        let finalVx1 = tx * dpTan1 + nx * newNorm1;
        let finalVy1 = ty * dpTan1 + ny * newNorm1;
        let finalVx2 = tx * dpTan2 + nx * newNorm2;
        let finalVy2 = ty * dpTan2 + ny * newNorm2;

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

        if (ball instanceof Ball) {
          ball.changeColor();
        }
      }
    }
  }

  processCollisions(ball, balls) {
    this.detectWallCollisions(ball);
    this.detectBallCollisions(ball, balls);
  }
}
