import { Renderer } from "./Renderer.js";
import { Physics } from "./Physics.js";
import { Ball } from "../entities/Ball.js";
import { Config } from "../config.js";
import { Util } from "../Util.js";

export class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.renderer = new Renderer(this.ctx);
    this.physics = new Physics();
    this.balls = [];

    this.init()
  }

  init() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.createballs()
  }

  createballs(){
    let max = (Config.radius*2)

    for (let i=0; i<Config.ballsAmount; i++){
      let x = Util.getRandomInt(max, window.innerWidth)
      let y = Util.getRandomInt(max, window.innerHeight)
      let ball = new Ball(x, y, Config.radius, Config.dx, Config.dy, Config.colors[0])
      
      ball.changeDirectionRandom()
      ball.setRandomColor()
      this.balls.push(ball) 
    } 
  }

  renderFrame() {
    this.renderer.clearScreen();
    this.renderer.renderBalls(this.balls);
    this.physics.moveBalls(this.balls)
    this.physics.detectBallsCollision(this.balls)
  }

  gameLoop = () => {
    requestAnimationFrame(this.gameLoop);
    
    this.renderFrame();
  };
}
