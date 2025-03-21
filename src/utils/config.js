export class Config {
  static playerSize = 10;
  static radius = 20;
  static dx = 20;
  static dy = 20;
  static speed = 6;
  static ballsAmount = 2;
  static maxBalls = Math.floor(
    (0.9 * canvas.width * canvas.height) / (Math.PI * Math.pow(this.radius, 2))
  );

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
}
