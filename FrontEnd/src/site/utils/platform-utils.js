export class PlatformUtils {
  static checkIfMobile() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      let mobileContainer = document.querySelector("#mobile-container");
      const messageElement = document.querySelector("#mobile-error-message");

      introContainer.style.display = "none";
      mobileContainer.style.display = "flex";

      messageElement.innerHTML =
        "К сожалению на данный момент игра не поддерживается на мобильных устройствах <br> <br> Попробуйте еще раз на компьютере";
    }
  }

  static preventTabResizesAndDevTools() {
    let keycodes = [17, 189, 187, 107, 109];

    if (!import.meta.env.DEV) {
      keycodes.push(123);
    }

    let target = window.opera ? document.body : document;
    target.addEventListener(
      "keydown",
      (event) => {
        if (keycodes.indexOf(event.keyCode) != -1) {
          event.preventDefault();
        }
        return false;
      },
      !window.opera,
    );

    target.addEventListener("contextmenu", (event) => {
      if (!import.meta.env.DEV) {
        event.preventDefault();
        return false;
      }
    });
  }

  static preventForbiddenThings() {
    this.checkIfMobile();
    this.preventTabResizesAndDevTools();
  }
}
