import { CookieUtils } from "../utils/cookie-utils";

export class CookieService {
    fillHeaderProfileCookies() {
        let username = CookieUtils.getCookie("username");
        if (username != "") {
            let profileText = document.querySelector("#profile-text-container");
            let usernameText = document.querySelector("#username");

            profileText.style.display = "flex";
            usernameText.innerHTML = username;
        }
    }

    fillUsernameInputCookies() {
        let username = CookieUtils.getCookie("username");

        if (username != "") {
            try {
                document.querySelector("#input").value = username;
            } catch (TypeError) {
                return;
            }
        }
    }
}
