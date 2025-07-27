export class UserInfoClient {
    apiUrl = import.meta.env.VITE_API_URL;

    async getUserByUsername(usernameString) {
        const encodedUsername = encodeURIComponent(usernameString);

        try {
            const response = await fetch(
                `${this.apiUrl}/users/infos?username=${encodedUsername}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch user info");
            }

            return await response.json();
        } catch (err) {
            console.error("Error:", err);
            return null;
        }
    }
}
