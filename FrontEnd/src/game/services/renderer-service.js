import { Ball } from "../objects/ball.js";
import { LifeObject } from "../objects/life-object.js";
import { PlayerStates } from "../objects/player-states.js";
import { Player } from "../objects/player.js";
import { SpecialEffectsObject } from "../objects/special-effects-object.js";
import { Config } from "../configs/game-config.js";

export class RendererService {
  constructor(ctx) {
    this.ctx = ctx;
  }

  setGameService(gameService) {
    this.gameService = gameService;
  }

  drawGameObject(gameObject) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = gameObject.strokeColor;
    this.ctx.fillStyle = Config.defaultFillColor;
    this.ctx.lineWidth = gameObject.thickness;

    if (gameObject instanceof Ball) {
      this.ctx.arc(
        gameObject.x,
        gameObject.y,
        gameObject.radius,
        0,
        Math.PI * 2,
        false,
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
        Config.lifeObjectSize,
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
      specialEffectsObject.height,
    );
  }

  renderPlayer(player) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = player.strokeColor;
    this.ctx.fillStyle = player.fillColor;
    this.ctx.lineWidth = player.thickness;

    this.ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2, false);

    this.ctx.stroke();
    this.ctx.fill();

    if (this.gameService.player.state == PlayerStates.PROTECTED) {
      this.renderShieldTimer(player);
    }
  }

  renderFrame(gameObjects) {
    for (let gameObject of gameObjects) {
      if (gameObject instanceof SpecialEffectsObject) {
        this.renderSpecialEffectsObject(gameObject);
      } else if (gameObject instanceof Player) {
        this.renderPlayer(gameObject);
      } else {
        this.drawGameObject(gameObject);
      }
    }
    this.renderPoints(this.gameService.points);
    this.renderLivesIndicator(
      this.gameService.lifeIndicator,
      this.gameService.player.amountOfLives,
    );
  }

  renderLoseMessage(message) {
    this.ctx.strokeText(
      message,
      window.innerWidth / 2 - 19,
      window.innerHeight / 2,
    );
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
  }

  renderShieldTimer(player) {
    const { x, y, radius, shieldTimeLeft, fillColor } = player;

    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = fillColor;
    this.ctx.arc(x, y, radius + 7, 0, shieldTimeLeft, false);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(53, 155, 233, 0.3)";
    this.ctx.arc(x, y, radius + 7, 0, Math.PI * 2);
    this.ctx.fill();
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}
