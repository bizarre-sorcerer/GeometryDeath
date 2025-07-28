export class ValidationUtils {
    static isUsernameValid(username) {
        if (input.value == "" || input.value == null) {
            input.classList.add("validationError");
            return false;
        } else {
            input.classList.remove("validationError");
            return true;
        }
    }
}
