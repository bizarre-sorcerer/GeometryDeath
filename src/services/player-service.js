import { Player } from "../entities/player.js";
import { PlayerStates } from "../entities/player-states.js";
import { Config } from "../utils/config.js";
import { GameUtils } from "../utils/game-utils.js";

export class PlayerService {
  changeStateToProtected(player) {
    if (player instanceof Player) {
      player.state = PlayerStates.PROTECTED;
      GameUtils.player.strokeColor = "#359be9";
      GameUtils.player.fillColor = "#359be9";

      setTimeout(() => {
        player.state = PlayerStates.DEFAULT;
        GameUtils.player.fillColor = Config.defaultFillColor;
      }, 5000);
    }
  }
}
