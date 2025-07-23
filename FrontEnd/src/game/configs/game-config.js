export class Config {
  static playerSize = 10;
  static radius = 15;
  static dx = 4;
  static dy = 4;
  static thickness = 2;
  static speed = 6;
  static ballsAmount = 2;
  static newBallInterval = 2000;
  static maxBalls = this.calculateBallsMaxAmount(0.06);

  static font = "50px Arial";
  static colors = [
    "#E54B4B",
    "#FFE066",
    "#247BA0",
    "#70C1B3",
    "#D63AF9",
    "#44CF6C",
    "#54457F",
  ];
  static defaultStrokeColor = "#ffffff";
  static defaultFillColor = "#00000000";
  static defaultAmountOfLives = 5;
  static maxAmountOfLives = 5;

  static lifeObjectSize = 30;
  static lifeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="red" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>`;

  static shieldDuration = 3000;
  static shieldAppereanceDelay = 7000;
  static shieldSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#359be9" d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z"/></svg>`;

  static calculateBallsMaxAmount(coveragePercent) {
    let maxInRow = Math.floor(window.innerWidth / (Config.radius * 2));
    let maxInColumn = Math.floor(window.innerHeight / (Config.radius * 2));
    let maxFit = maxInColumn * maxInRow;
    return maxFit * coveragePercent;
  }
}
