export class AuthClient {
  async createGuestAccount(username) {
    try {
      const response = await fetch(
        "https://p01--build-and-deploy--92vp4znyczky.code.run/api/auth/create-guest-account",
        // "http://localhost:8080/api/auth/create-guest-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ username }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create guest account");
      }

      const token = await response.text();

      setCookie("jwt", token);
    } catch (err) {
      console.error("Error:", err);
    }
  }
}
