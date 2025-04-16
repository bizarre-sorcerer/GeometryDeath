import { Ball } from "../entities/ball.js";
import { Player } from "../entities/player.js";
import { LifeObject } from "../entities/life-object.js";
import { ShieldObject } from "../entities/shield-object.js";
import { PlayerStates } from "../entities/player-states.js";
import { PhysicsUtils } from "../utils/physics-utils.js";

export class PhysicsService {
  constructor(playerService, gameService) {
    this.playerService = playerService;
    this.gameService = gameService;
  }

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

  handleBallPhysics(ball, balls) {
    this.moveBall(ball);
    this.detectWallCollisions(ball);

    for (let otherBall of balls) {
      if (otherBall instanceof Ball) {
        if (PhysicsUtils.areObjectsColliding(ball, otherBall)) {
          PhysicsUtils.correctIfBallsOverlap(ball, otherBall);
          PhysicsUtils.calculateNewBallSpeeds(ball, otherBall);
          ball.changeColor();
        }
      }
    }
  }

  handleLifeObjectCollision(player, lifeObject) {
    player.amountOfLives += 1;

    this.gameService.removeGameObject(lifeObject, this.gameService.lifeObjects);
    this.gameService.removeGameObject(
      lifeObject,
      this.gameService.allGameObjects
    );
  }

  handleShieldObjectCollison(player, shieldObject) {
    this.gameService.shieldAvailable = false;
    this.playerService.changeStateToProtected(player);

    let shieldIndex = this.gameService.allGameObjects.indexOf(shieldObject);
    this.gameService.allGameObjects.splice(shieldIndex, 1);
  }

  handlePlayerPhysics(player, gameObjects) {
    for (let gameObject of gameObjects) {
      if (!PhysicsUtils.areObjectsColliding(player, gameObject)) continue;

      if (gameObject instanceof LifeObject) {
        this.handleLifeObjectCollision(player, gameObject);
        return;
      }

      if (gameObject instanceof ShieldObject) {
        this.handleShieldObjectCollison(player, gameObject);
        return;
      }

      if (player.state == PlayerStates.DEFAULT) {
        player.amountOfLives -= 1;
      }

      if (player.amountOfLives < 1) {
        this.gameService.endGame();
      }

      this.gameService.removeGameObject(
        gameObject,
        this.gameService.allGameObjects
      );
    }
  }

  processPhysics(gameObjects) {
    for (let gameObject of gameObjects) {
      if (gameObject instanceof Player) {
        this.handlePlayerPhysics(this.gameService.player, gameObjects);
      } else if (gameObject instanceof Ball) {
        this.handleBallPhysics(gameObject, gameObjects);
      }
    }
  }
}
