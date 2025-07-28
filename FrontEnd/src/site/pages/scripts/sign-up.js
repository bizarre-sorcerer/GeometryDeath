import { createGuestAccount } from "../../api/auth/create-guest-account.js";
import { ValidationUtils } from "../../utils/validation-utils.js";

const usernameInput = document.querySelector("#username-input");
const signUpButton = document.querySelector("#sign-up-button");

signUpButton.addEventListener("click", async () => {
    const username = usernameInput.value;
    if (ValidationUtils.isUsernameValid(username)) {
        const result = await createGuestAccount(username);
        console.log(result);

        if (result) {
            alert("Guest account created successfully!");
        } else if (result == null) {
            alert("Failed to create guest account. Service unavailable");
        }
    }
});
