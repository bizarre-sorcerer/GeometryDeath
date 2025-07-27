import { CookieUtils } from "../utils/cookie-utils";

export class AuthClient {
    apiUrl = import.meta.env.VITE_API_URL;

    async createGuestAccount(usernameString) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: usernameString }),
        };

        try {
            const response = await fetch(
                `${this.apiUrl}/auth/create-guest-account`,
                options
            );

            if (!response.ok) {
                CookieUtils.setCookie("signedIn", "false");
                throw new Error("Failed to create guest account");
            }

            CookieUtils.setCookie("signedIn", "true");
            return await response.json;
        } catch (err) {
            CookieUtils.setCookie("signedIn", "false");
            console.error("Error:", err);
            return null;
        }
    }
}
