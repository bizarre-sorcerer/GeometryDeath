import { Ball } from "../entities/ball.js";
import { Player } from "../entities/player.js";
import { Rect } from "../entities/rect.js";
import { GameUtils } from "../utils/game-utils.js";

export class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
  }

  drawGameObject(gameObject) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = gameObject.color;
    this.ctx.lineWidth = gameObject.thickness;

    if (gameObject instanceof Ball || gameObject instanceof Player) {
      this.ctx.arc(
        gameObject.x,
        gameObject.y,
        gameObject.radius,
        0,
        Math.PI * 2,
        false
      );
    } else if (gameObject instanceof Rect || gameObject instanceof Player) {
      this.ctx.rect(
        gameObject.x,
        gameObject.y,
        gameObject.width,
        gameObject.height
      );
    }
    this.ctx.stroke();
  }

  renderFrame(gameObjects) {
    for (let gameObject of gameObjects) {
      this.drawGameObject(gameObject);
    }
  }

  renderPoints(points) {
    this.ctx.strokeText(Math.ceil(points), window.innerWidth / 2 - 19, 60);
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
