class PlayerState {
  constructor(stateName) {
    this.name = stateName;
  }
}

export const PlayerStates = Object.freeze({
  DEFAULT: new PlayerState("DEFAULT"),
  PROTECTED: new PlayerState("PROTECTED"),
});
