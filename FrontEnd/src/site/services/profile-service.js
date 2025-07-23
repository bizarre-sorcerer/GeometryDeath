import { CookieUtils } from "../utils/cookie-utils.js";

export class ProfileService {
  constructor() {
    this.init();
  }

  init() {
    let profileContainer = document.querySelector("#profile-container");
    profileContainer.addEventListener("click", this.fillProfileInfo);
  }

  fillProfileInfo() {
    let profileUsername = document.querySelector("#username-element");
    profileUsername.innerHTML = username;
  }
}
