import { Config } from "../utils/config.js";

export class Physics {
  moveBall(ball) {
    ball.x += ball.dx;
    ball.y += ball.dy;
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

    if (ball.x < ball.radius) {
      ball.x = ball.radius;
      ball.dx *= -1;
      ball.changeColor();
    } else if (rightEdgePos > window.innerWidth) {
      ball.x = window.innerWidth - ball.radius;
      ball.dx *= -1;
      ball.changeColor();
    }

    if (ball.y < ball.radius) {
      ball.y = ball.radius;
      ball.dy *= -1;
      ball.changeColor();
    } else if (bottomEdgePos > window.innerHeight) {
      ball.y = window.innerHeight - ball.radius;
      ball.dy *= -1;
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

      // Вычисляем вектор между центрами шаров.
      const dx = otherBall.x - ball.x;
      const dy = otherBall.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Проверяем, происходит ли столкновение.
      if (distance < ball.radius + otherBall.radius) {
        // КОРРЕКЦИЯ ПОЗИЦИИ:
        // Чтобы шары не прилипали друг к другу, сдвигаем их так, чтобы они не пересекались.
        const overlap = ball.radius + otherBall.radius - distance;
        const correctionX = (overlap / 2) * (dx / distance);
        const correctionY = (overlap / 2) * (dy / distance);
        ball.x -= correctionX;
        ball.y -= correctionY;
        otherBall.x += correctionX;
        otherBall.y += correctionY;

        // РЕАГИРОВАНИЕ НА СТОЛКНОВЕНИЕ:
        // Вычисляем нормальный вектор (направление от ball к otherBall).
        const nx = dx / distance;
        const ny = dy / distance;
        // Вычисляем тангенциальный вектор (перпендикулярный нормали).
        const tx = -ny;
        const ty = nx;

        // Декомпозиция скоростей по нормальной и тангенциальной компонентам.
        const dpNorm1 = ball.dx * nx + ball.dy * ny;
        const dpTan1 = ball.dx * tx + ball.dy * ty;
        const dpNorm2 = otherBall.dx * nx + otherBall.dy * ny;
        const dpTan2 = otherBall.dx * tx + otherBall.dy * ty;

        // Обмен нормальными компонентами (при равных массах).
        const newNorm1 = dpNorm2;
        const newNorm2 = dpNorm1;

        // Пересобираем итоговые векторы скорости.
        let finalVx1 = tx * dpTan1 + nx * newNorm1;
        let finalVy1 = ty * dpTan1 + ny * newNorm1;
        let finalVx2 = tx * dpTan2 + nx * newNorm2;
        let finalVy2 = ty * dpTan2 + ny * newNorm2;

        // НЕОБЯЗАТЕЛЬНО: Нормализуем скорости для сохранения постоянной скорости.
        // Предполагается, что у каждого шара есть свойство `speed`, задающее его постоянную скорость.
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

        // Применяем новые скорости.
        ball.dx = finalVx1;
        ball.dy = finalVy1;
        otherBall.dx = finalVx2;
        otherBall.dy = finalVy2;

        // Необязательная визуальная обратная связь.
        ball.changeColor();
      }
    }
  }

  processCollisions(ball, balls) {
    this.detectWallCollisions(ball);
    this.detectBallCollisions(ball, balls);
  }
}
