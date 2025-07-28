import * as CookiesService from "../../services/cookie-service.js";
import { CookieUtils } from "../../utils/cookie-utils.js";

let signUpBtn = document.querySelector("#nav-link");
let signUpModal = document.querySelector("#sign-up-modal");
let modalForm = document.querySelector("#modal-form");

CookiesService.resolveHeaderDisplay();

if (!CookieUtils.isSignedIn()) {
    signUpBtn.addEventListener("click", () => {
        signUpModal.style.display = "flex";
    });

    signUpModal.addEventListener("click", () => {
        signUpModal.style.display = "none";
    });

    modalForm.addEventListener("click", (event) => {
        event.stopPropagation();
    });
}
