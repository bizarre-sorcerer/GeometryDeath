import { CookieUtils } from "../utils/cookie-utils";

export class CookieHandler {
    checkUsernameCookie(input) {
        let user = CookieUtils.getCookie("username");
        if (user != "") {
        input.value = user;
        }
    }
}