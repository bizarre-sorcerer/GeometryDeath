import { CookieUtils } from "../../utils/cookie-utils";

export async function createGuestAccount(usernameString) {
    let apiUrl = import.meta.env.VITE_API_URL;

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: usernameString }),
    };

    try {
        console.log("Sending request to create guest account");
        const response = await fetch(
            `${apiUrl}/auth/create-guest-account`,
            options
        );

        if (!response.ok) {
            CookieUtils.setCookie("signedIn", "false");
            throw new Error("Failed to create guest account");
        }

        CookieUtils.setCookie("signedIn", "true");
        return await response.json();
    } catch (err) {
        CookieUtils.setCookie("signedIn", "false");
        console.error("Error:", err);
        return null;
    }
}
