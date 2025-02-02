import { Renderer } from "./renderer.js";
import { Physics } from "./physics.js";
import { Player } from "../entities/player.js"
import { Ball } from "../entities/ball.js"

export class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.renderer = new Renderer(this.ctx);
    this.physics = new Physics();

    this.init()
  }

  init() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.player = new Player(20, 20)
    this.ball = new Ball(200, 200, 50)
  }

  renderFrame() {
    this.renderer.drawGameObject(this.player)
    this.renderer.drawGameObject(this.ball)
  }

  gameLoop = () => {
    requestAnimationFrame(this.gameLoop);
    
    this.renderFrame();
  };
}
