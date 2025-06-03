import { GameObject } from "./game-object.js";
import { PlayerStates } from "./player-states.js";
import { Config } from "../utils/config.js";

export class Player extends GameObject {
  constructor({
    x,
    y,
    radius,
    thickness,
    strokeColor,
    fillColor,
    amountOfLives,
  } = {}) {
    super({ x, y });
    this.gameService = null;
    this.radius = radius;
    this.thickness = thickness;
    this.amountOfLives = amountOfLives;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.state = PlayerStates.DEFAULT;

    this.shieldTimeLeft = (Math.PI * 2).toFixed(2);
    this.shieldTimerInterval;
    this.gameService;
  }

  setGameService(gameService) {
    this.gameService = gameService;
  }

  changeStateToProtected(player) {
    if (player instanceof Player) {
      player.state = PlayerStates.PROTECTED;
      this.strokeColor = "#359be9";
      this.fillColor = "#359be9";

      setTimeout(() => {
        this.state = PlayerStates.DEFAULT;
        this.fillColor = Config.defaultFillColor;
        this.gameService.createShieldWithDelay();
        clearInterval(this.shieldTimerInterval);
      }, Config.shieldDuration);
    }
  }

  handleShieldTimer() {
    let self = this;
    this.shieldTimerInterval = setInterval(function () {
      self.shieldTimeLeft = self.shieldTimeLeft - 0.2129;
    }, 100);

    setTimeout(() => {
      this.shieldTimeLeft = (Math.PI * 2).toFixed(2);
    }, 3010);
  }

  isEqual(otherObject) {
    if (this == otherObject) {
      return true;
    } else {
      return false;
    }
  }
}
