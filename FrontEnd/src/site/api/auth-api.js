import { CookieUtils } from "../utils/cookie-utils";

export class AuthClient {
  apiUrl = import.meta.env.VITE_API_URL;

  async createGuestAccount(usernameString) {
    let options =  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: usernameString }),
      }

    try {
      fetch(`${this.apiUrl}/auth/create-guest-account`, options)
        .then(response => {
          if (!response.ok) {
              throw new Error("Failed to create guest account");
            } else if (response.ok) {
              CookieUtils.setCookie("signedIn", "true")
            }
        });
    } catch (err) {
      console.error("Error:", err);
    }
  }
}
