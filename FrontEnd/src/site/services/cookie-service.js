import { CookieUtils } from "../utils/cookie-utils";

export function fillHeaderProfileCookies() {
    let username = CookieUtils.getCookie("username");
    if (username != "") {
        let profileText = document.querySelector("#profile-text-container");
        let usernameText = document.querySelector("#username");

        profileText.style.display = "flex";
        usernameText.innerHTML = username;
    }
}

export function fillUsernameInputCookies() {
    let username = CookieUtils.getCookie("username");

    if (username != "") {
        try {
            document.querySelector("#input").value = username;
        } catch (TypeError) {
            return;
        }
    }
}

export function resolveHeaderDisplay() {
    let usernameElement = document.querySelector("#username");
    let roleElement = document.querySelector("#account-role");
    let signIn = document.querySelector("#sign-up");
    let navLink = document.querySelector("#nav-link");

    if (CookieUtils.isSignedIn()) {
        signIn.style.display = "none";
        usernameElement.style.display = "block";
        roleElement.style.display = "block";
        navLink.href = "./src/site/pages/templates/profile.html";
    } else {
        signIn.style.display = "block";
        usernameElement.style.display = "none";
        roleElement.style.display = "none";
        navLink.href = "#";
    }
}
