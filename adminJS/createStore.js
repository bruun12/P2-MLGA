// Fetch and populate the address dropdown
async function populateAddressDropdown() {
    try {
        const response = await fetch('/api/addresses');
        if (response.ok) {
            const addresses = await response.json();
            const addressDropdown = document.getElementById('storeAddress');
            addresses.forEach(address => {
                const option = document.createElement('option');
                option.value = address.id;
                option.textContent = `${address.street}, ${address.city}, ${address.zip}`;
                addressDropdown.appendChild(option);
            });
        } else {
            console.error('Failed to fetch addresses');
        }
    } catch (err) {
        console.error('Error fetching addresses:', err);
    }
}

// Handle form submission
document.getElementById('createStoreForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const storeData = {
        name: document.getElementById('storeName').value,
        img: document.getElementById('storeImage').value,
        address: {
            street: document.getElementById('storeStreet').value,
            city: document.getElementById('storeCity').value,
            zip: document.getElementById('storeZip').value,
        },
        phone: document.getElementById('storePhone').value,
    };

    try {
        const response = await fetch('/api/createStore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(storeData),
        });

        if (response.ok) {
            alert('Store created successfully!');
            document.getElementById('createStoreForm').reset();
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (err) {
        console.error('Error creating store:', err);
        alert('An error occurred while creating the store.');
    }
});

// Populate the address dropdown on page load
populateAddressDropdown();
