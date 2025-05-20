document.getElementById("createEventForm").addEventListener("submit", async function (e) {
    e.preventDefault(); 

    
    const eventData = {
        storeId: document.getElementById("storeId").value,
        eventImage: document.getElementById("eventImage").value,
        eventTitle: document.getElementById("eventTitle").value,
        eventDescription: document.getElementById("eventDescription").value,
        eventDate: document.getElementById("eventDate").value,
        addressId: document.getElementById("addressId").value || null, // Tillad tom værdi da de er lavet valgfrie i vores fine database
        memberId: document.getElementById("memberId").value || null, // Samme her
    };

    try {
        const response = await fetch("/node0/events", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(eventData),
        });

        if (response.ok) {
            alert("Event created successfully!");
            document.getElementById("createEventForm").reset(); 
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message || "Failed to create event."}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while creating the event.");
    }
});

// Ad genbrugt kode fra login.js