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
        const response = await fetch('api/createStore', {
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
