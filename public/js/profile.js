const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

document.addEventListener("DOMContentLoaded", async () => {
    if (userId) {
        try {
            // Fetch user information
            const userResponse = await fetch(`http://localhost:3350/user/${userId}`);
            if (userResponse.ok) {
                const userData = await userResponse.json();
                document.getElementById("userName").innerText = `Name: ${userData.firstname} ${userData.lastname}`;
                document.getElementById("userEmail").innerText = `Email: ${userData.email}`;
            } else {
                throw new Error("Failed to fetch user information.");
            }

            // Fetch user favorites
            const favoritesResponse = await fetch("http://localhost:3350/get-favorites", {
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
            window.location.href = "login.html";
        }
    } else {
        alert("User ID not found. Please log in again.");
        window.location.href = "login.html";
    }
});

