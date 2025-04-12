import { Ball } from "../entities/ball.js";
import { LifeObject } from "../entities/life-object.js";
import { Player } from "../entities/player.js";
import { Config } from "../utils/config.js";
import { GameUtils } from "../utils/game-utils.js";

export class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
  }

  drawGameObject(gameObject) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = gameObject.color;
    this.ctx.lineWidth = gameObject.thickness;

    if (
      gameObject instanceof Ball ||
      gameObject instanceof Player ||
      gameObject instanceof LifeObject
    ) {
      this.ctx.arc(
        gameObject.x,
        gameObject.y,
        gameObject.radius,
        0,
        Math.PI * 2,
        false
      );
    }
    this.ctx.stroke();
  }

  renderPoints(points) {
    this.ctx.strokeText(Math.ceil(points), window.innerWidth / 2 - 19, 60);
  }

  renderLives(lifeObject, lives) {
    let xPos = 20;
    for (let i = 0; i < lives; i++) {
      let img = lifeObject.img;
      this.ctx.drawImage(
        img,
        xPos,
        20,
        Config.lifeObjectSize,
        Config.lifeObjectSize
      );
      xPos += 40;
    }
  }

  renderLifeObject(lifeObject) {
    let img = lifeObject.img;
    this.ctx.drawImage(
      img,
      lifeObject.x,
      lifeObject.y,
      lifeObject.width,
      lifeObject.height
    );
  }

  renderFrame(gameObjects) {
    for (let gameObject of gameObjects) {
      if (gameObject instanceof LifeObject) {
        this.renderLifeObject(gameObject);
      } else {
        this.drawGameObject(gameObject);
      }
    }
    this.renderPoints(GameUtils.points);
    this.renderLives(GameUtils.lifeIndicator, GameUtils.player.amountOfLives);
  }

  renderLoseMessage() {
    let points = Math.ceil(GameUtils.points);
    this.ctx.strokeText(
      `LOL, only ${points} points?`,
      window.innerWidth / 2 - 19,
      window.innerHeight / 2
    );
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}
