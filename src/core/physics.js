import { Config } from "../utils/config.js";
import { Ball } from "../entities/ball.js";
import { Player } from "../entities/player.js";
import { GameUtils } from "../utils/game-utils.js";
import { LifeObject } from "../entities/life-object.js";

export class Physics {
  static xDistance = 0;
  static yDistance = 0;

  movePlayer(player, x, y) {
    if (
      x <= player.radius ||
      x >= window.innerWidth - player.radius ||
      y <= player.radius ||
      y >= window.innerHeight - player.radius
    ) {
      return;
    }
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

  calculateDistance(gameObject, otherGameObject) {
    const xDistance = otherGameObject.x - gameObject.x;
    const yDistance = otherGameObject.y - gameObject.y;

    Physics.xDistance = xDistance;
    Physics.yDistance = yDistance;

    const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    return distance;
  }

  areObjectsColliding(gameObject, otherGameObject) {
    if (gameObject.isEqual(otherGameObject)) return;

    let distance = this.calculateDistance(gameObject, otherGameObject);

    return distance < gameObject.radius + otherGameObject.radius;
  }

  correctIfBallsOverlap(ball, otherBall) {
    let distance = this.calculateDistance(ball, otherBall);

    const overlap = ball.radius + otherBall.radius - distance;
    const correctionX = (overlap / 2) * (Physics.xDistance / distance);
    const correctionY = (overlap / 2) * (Physics.yDistance / distance);
    ball.x -= correctionX;
    ball.y -= correctionY;
    otherBall.x += correctionX;
    otherBall.y += correctionY;
  }

  calculateNewBallSpeeds(ball, otherBall) {
    let distance = this.calculateDistance(ball, otherBall);

    const normalVectorX = Physics.xDistance / distance;
    const normalVectorY = Physics.yDistance / distance;
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

  processBallCollision(ball, otherBall) {
    this.correctIfBallsOverlap(ball, otherBall);
    this.calculateNewBallSpeeds(ball, otherBall);
    ball.changeColor();
  }

  handleBallPhysics(ball, balls) {
    this.moveBall(ball);
    this.detectWallCollisions(ball);

    for (let otherBall of balls) {
      if (otherBall instanceof Ball) {
        if (this.areObjectsColliding(ball, otherBall)) {
          this.processBallCollision(ball, otherBall);
        }
      }
    }
  }

  handlePlayerPhysics(player, gameObjects) {
    for (let gameObject of gameObjects) {
      if (this.areObjectsColliding(player, gameObject)) {
        if (gameObject instanceof LifeObject) {
          return;
        }
        if (player.amountOfLives <= 1) {
          GameUtils.gameOngoing = false;
        }

        let index = GameUtils.allGameObjects.indexOf(gameObject);
        GameUtils.allGameObjects.splice(index, 1);

        player.amountOfLives -= 1;
      }
    }
  }

  handleLifeObjectPhysics(lifeObject, gameObjects) {
    for (let gameObject of gameObjects) {
      if (this.areObjectsColliding(lifeObject, gameObject)) {
        if (gameObject instanceof Player) {
          if (GameUtils.player.amountOfLives < Config.maxAmountOfLives) {
            GameUtils.player.amountOfLives += 1;
          }

          let indexLifeObjects = GameUtils.lifeObjects.indexOf(lifeObject);
          let indexGameObjects = GameUtils.allGameObjects.indexOf(lifeObject);

          GameUtils.lifeObjects.splice(indexLifeObjects, 1);
          GameUtils.allGameObjects.splice(indexGameObjects, 1);
        }
      }
    }
  }

  processPhysics(gameObjects) {
    for (let gameObject of gameObjects) {
      if (gameObject instanceof Ball) {
        this.handleBallPhysics(gameObject, gameObjects);
      } else if (gameObject instanceof Player) {
        this.handlePlayerPhysics(gameObject, gameObjects);
      } else if (gameObject instanceof LifeObject) {
        this.handleLifeObjectPhysics(gameObject, gameObjects);
      }
    }
  }
}
