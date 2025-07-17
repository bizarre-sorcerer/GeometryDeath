export class ValidationUtils {
    
    static isInputValid(input) {
      if (input.value == "" || input.value == null) {
        input.classList.add("validationError");
        return false;
      } else {
        input.classList.remove("validationError");
        return true;
      }
    }
}