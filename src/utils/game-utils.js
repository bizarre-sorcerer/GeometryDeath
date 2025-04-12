import { Config } from "./config.js";
import { Ball } from "../entities/ball.js";
import { Player } from "../entities/player.js";
import { LifeObject } from "../entities/life-object.js";

export class GameUtils {
  static allGameObjects = [];
  static balls = [];
  static lifeObjects = [];
  static lifeObjectsInterval;
  static player;
  static points = 0;
  static gameOngoing = true;
  static gameInitTimeStamp;
  static lastTimeBallsAdded;
  static lifeIndicator;

  static setUpCanvas(canvas, ctx) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.font = Config.font;

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.font = Config.font;
    });
  }

  static getRandomInt(min, max) {
    let randomNum = Math.random() * (max - min) + min;
    return Math.ceil(randomNum);
  }

  static createMoreBalls() {
    let minimalCoordinate = Config.radius * 2;

    for (let i = 0; i < Config.ballsAmount; i++) {
      let x = GameUtils.getRandomInt(minimalCoordinate, window.innerWidth);
      let y = GameUtils.getRandomInt(minimalCoordinate, window.innerHeight);
      let ball = new Ball({
        x: x,
        y: y,
        radius: Config.radius,
        dx: Config.dx,
        dy: Config.dy,
        thickness: Config.thickness,
        color: Config.colors[0],
      });

      ball.changeDirectionRandom();
      ball.setRandomColor();
      this.allGameObjects.push(ball);
      this.balls.push(ball);
    }
  }

  static createPlayer(canvas, physics) {
    GameUtils.player = new Player({
      x: 10,
      y: 10,
      radius: Config.playerSize,
      thickness: Config.thickness,
      color: Config.playerColor,
      amountOfLives: Config.defaultAmountOfLives,
    });
    GameUtils.allGameObjects.push(this.player);

    canvas.addEventListener("mousemove", function (event) {
      physics.movePlayer(GameUtils.player, event.clientX, event.clientY);
    });
  }

  static createNewBallsPeriodically() {
    if (performance.now() - GameUtils.lastTimeBallsAdded >= 2000) {
      if (GameUtils.allGameObjects.length < Config.maxBalls) {
        GameUtils.createMoreBalls();
      }
      GameUtils.lastTimeBallsAdded = performance.now();
    }
  }

  static keepTrackOfTime() {
    GameUtils.gameInitTimeStamp = performance.now();
    GameUtils.lastTimeBallsAdded = performance.now();
  }

  static createLifeIndicator() {
    let lifeObject = new LifeObject({
      x: null,
      y: null,
      thickness: 0,
      svgString: Config.lifeSvg,
    });

    GameUtils.lifeIndicator = lifeObject;
  }

  static createLifeObjectsPeriodically() {
    GameUtils.lifeObjectsInterval = setInterval(function () {
      let playerHasMaxAmountOfLives =
        GameUtils.lifeObjects.length >=
        Config.maxAmountOfLives - GameUtils.player.amountOfLives;

      if (playerHasMaxAmountOfLives) {
        return;
      }

      let maxNeededAmount =
        Config.maxAmountOfLives -
        GameUtils.player.amountOfLives -
        GameUtils.lifeObjects.length;

      let amountToCreate = Math.min(2, maxNeededAmount);

      for (let i = 0; i < amountToCreate; i++) {
        let x = GameUtils.getRandomInt(10, window.innerWidth);
        let y = GameUtils.getRandomInt(10, window.innerHeight);

        let lifeObject = new LifeObject({
          x: x,
          y: y,
          thickness: 0,
          svgString: Config.lifeSvg,
        });

        GameUtils.allGameObjects.push(lifeObject);
        GameUtils.lifeObjects.push(lifeObject);
      }
    }, 10000);
  }

  static correctPlayerPosition() {
    if (this.player.x + this.player.radius > window.innerWidth) {
      this.player.x = window.innerWidth - this.player.radius;
    } else if (this.player.y + this.player.radius > window.innerHeight) {
      this.player.y = window.innerHeight - this.player.radius;
    }
  }
}
