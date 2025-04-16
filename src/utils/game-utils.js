export class GameUtils {
  static getRandomInt(min, max) {
    let randomNum = Math.random() * (max - min) + min;
    return Math.ceil(randomNum);
  }
}
