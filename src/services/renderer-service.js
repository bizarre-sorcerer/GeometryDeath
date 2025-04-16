import { Ball } from "../entities/ball.js";
import { LifeObject } from "../entities/life-object.js";
import { Player } from "../entities/player.js";
import { SpecialEffectsObject } from "../entities/special-effects-object.js";
import { Config } from "../utils/config.js";

export class RendererService {
  constructor(ctx, gameService) {
    this.ctx = ctx;
    this.gameService = gameService;
  }

  drawGameObject(gameObject) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = gameObject.strokeColor;
    this.ctx.fillStyle = gameObject.fillColor;
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
    this.ctx.fill();
  }

  renderPoints(points) {
    this.ctx.strokeText(Math.ceil(points), window.innerWidth / 2 - 19, 60);
  }

  renderLivesIndicator(lifeObject, lives) {
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

  renderSpecialEffectsObject(specialEffectsObject) {
    let img = specialEffectsObject.img;
    this.ctx.drawImage(
      img,
      specialEffectsObject.x,
      specialEffectsObject.y,
      specialEffectsObject.width,
      specialEffectsObject.height
    );
  }

  renderFrame(gameObjects) {
    for (let gameObject of gameObjects) {
      if (gameObject instanceof SpecialEffectsObject) {
        this.renderSpecialEffectsObject(gameObject);
      } else {
        this.drawGameObject(gameObject);
      }
    }
    this.renderPoints(this.gameService.points);
    this.renderLivesIndicator(
      this.gameService.lifeIndicator,
      this.gameService.player.amountOfLives
    );
  }

  renderLoseMessage(message) {
    this.ctx.strokeText(
      message,
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
