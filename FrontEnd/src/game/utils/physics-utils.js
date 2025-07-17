import { SpecialEffectsObject } from "../objects/special-effects-object.js";
import { Config } from "../configs/game-config.js";

export class PhysicsUtils {
  static xDistance = 0;
  static yDistance = 0;

  static calculateDistance(gameObject, otherGameObject) {
    const xDistance = otherGameObject.x - gameObject.x;
    const yDistance = otherGameObject.y - gameObject.y;

    PhysicsUtils.xDistance = xDistance;
    PhysicsUtils.yDistance = yDistance;

    const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    return distance;
  }

  static rectAndBallCollision(rect, ball) {
    const closestX = Math.max(rect.x, Math.min(ball.x, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(ball.y, rect.y + rect.height));

    const distX = ball.x - closestX;
    const distY = ball.y - closestY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    return distance <= ball.radius;
  }

  static areObjectsColliding(gameObject, otherGameObject) {
    if (gameObject.isEqual(otherGameObject)) return;

    // to do: исправить этот гавно код
    if (gameObject instanceof SpecialEffectsObject) {
      return this.rectAndBallCollision(gameObject, otherGameObject);
    } else if (otherGameObject instanceof SpecialEffectsObject) {
      return this.rectAndBallCollision(otherGameObject, gameObject);
    }

    let distance = this.calculateDistance(gameObject, otherGameObject);
    return distance < gameObject.radius + otherGameObject.radius;
  }

  static correctIfBallsOverlap(ball, otherBall) {
    let distance = this.calculateDistance(ball, otherBall);

    const overlap = ball.radius + otherBall.radius - distance;
    const correctionX = (overlap / 2) * (PhysicsUtils.xDistance / distance);
    const correctionY = (overlap / 2) * (PhysicsUtils.yDistance / distance);
    ball.x -= correctionX;
    ball.y -= correctionY;
    otherBall.x += correctionX;
    otherBall.y += correctionY;
  }

  static calculateNewBallSpeeds(ball, otherBall) {
    let distance = this.calculateDistance(ball, otherBall);

    const normalVectorX = PhysicsUtils.xDistance / distance;
    const normalVectorY = PhysicsUtils.yDistance / distance;
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
}
