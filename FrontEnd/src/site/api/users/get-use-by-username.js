export async function getUserByUsername(usernameString) {
    let apiUrl = import.meta.env.VITE_API_URL;
    const encodedUsername = encodeURIComponent(usernameString);

    try {
        const response = await fetch(
            `${apiUrl}/users/infos?username=${encodedUsername}`
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
