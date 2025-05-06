document.addEventListener("DOMContentLoaded", async () => {
    // Hent brugerdata fra localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id; // Hent brugerens ID

    if (user) {
        try {
            // Vis brugerens navn og e-mail
            document.getElementById("userName").innerText = `Name: ${user.first_name} ${user.last_name}`;
            document.getElementById("userEmail").innerText = `Email: ${user.email}`;

            // Fetch user favorites
            const favoritesResponse = await fetch(`http://localhost:3350/get-favorites?userId=${userId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const favoritesList = document.getElementById("favoritesList");
            if (favoritesResponse.ok) {
                const favorites = await favoritesResponse.json();
                favorites.forEach(favorite => {
                    const li = document.createElement("li");
                    li.textContent = favorite.name; // Assuming each favorite has a 'name'
                    favoritesList.appendChild(li);
                });
            } else {
                favoritesList.innerHTML = "<li>Failed to load favorites.</li>";
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
            window.location.href = "/html/login.html"; // Opdateret sti
        }
    } else {
        // Hvis brugerdata ikke findes, send brugeren tilbage til login-siden
        alert("User not found. Please log in again.");
        window.location.href = "/html/login.html"; // Opdateret sti
    }
});