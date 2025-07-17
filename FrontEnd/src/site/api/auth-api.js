export class AuthClient {
  async createGuestAccount(usernameString) {
    let apiUrl = import.meta.env.VITE_API_URL;
    try {
      fetch(`${apiUrl}/auth/create-guest-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: usernameString }),
      });
      // if (!response.ok) {
      //   throw new Error("Failed to create guest account");
      // }

      // const token = await response.text();
      // setCookie("jwt", token);
    } catch (err) {
      console.error("Error:", err);
    }
  }
}
