export class Config {
  static playerSize = 10;
  static radius = 20;
  static dx = 20;
  static dy = 0;
  static thickness = 2;
  static speed = 6;
  static ballsAmount = 1;
  static maxBalls = this.calculateBallsMaxAmount(0.07);

  static font = "50px Arial";
  static colors = [
    "#ffffff",
    "#E54B4B",
    "#FFE066",
    "#247BA0",
    "#70C1B3",
    "#D63AF9",
    "#44CF6C",
    "#54457F",
  ];
  static playerColor = "#ffffff";
  static defaultAmountOfLives = 4;
  static maxAmountOfLives = 4;

  static calculateBallsMaxAmount(coveragePercent) {
    let maxInRow = Math.floor(window.innerWidth / (Config.radius * 2));
    let maxInColumn = Math.floor(window.innerHeight / (Config.radius * 2));
    let maxFit = maxInColumn * maxInRow;
    return maxFit * coveragePercent;
  }
}
