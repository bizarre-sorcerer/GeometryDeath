import { CookieUtils } from "../utils/cookie-utils";

export class CookieHandler {
    
    fillUsernameFromCookies() {
        let username = CookieUtils.getCookie("username");
        if (username != "") {
            const usernameInput = document.querySelector("#input");
            let profileText = document.querySelector('#profile-text-container')
            let usernameText = document.querySelector('#username')
            
            profileText.style.display = 'flex'
            usernameText.innerHTML = username
            usernameInput.value = username;
        }
    }
}