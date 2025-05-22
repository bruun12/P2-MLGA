document.addEventListener("DOMContentLoaded", async () => {
    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id; // Get user's ID

    if (user) {
        try {
            // Display user's name and email
            document.getElementById("userName").innerText = `Name: ${user.first_name} ${user.last_name}`;
            document.getElementById("userEmail").innerText = `Email: ${user.email}`;

            // Fetch user favorites
            const favoritesResponse = await fetch(`get-favorites?userId=${userId}`, {
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
            window.location.href = "html/login.html"; // Updated path
        }
    } else {
        // If user data is not found, redirect user to login page
        alert("User not found. Please log in again.");
        window.location.href = "html/login.html"; // Updated path
    }
});