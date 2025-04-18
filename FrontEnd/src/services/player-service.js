import { Player } from "../entities/player.js";
import { PlayerStates } from "../entities/player-states.js";
import { Config } from "../utils/config.js";

export class PlayerService {
  constructor() {
    this.gameService = null;
  }

  setGameService(gameService) {
    this.gameService = gameService;
  }

  changeStateToProtected(player) {
    if (player instanceof Player) {
      player.state = PlayerStates.PROTECTED;
      this.gameService.player.strokeColor = "#359be9";
      this.gameService.player.fillColor = "#359be9";

      setTimeout(() => {
        player.state = PlayerStates.DEFAULT;
        this.gameService.player.fillColor = Config.defaultFillColor;
        this.gameService.createShieldWithDelay();
      }, Config.shieldDuration);
    }
  }
}
