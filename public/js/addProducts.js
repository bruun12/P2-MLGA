document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('productForm');
    const messageContainer = document.getElementById('messageContainer');

    productForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data for product table
        const productData = {
            name: document.getElementById('productName').value,
            category_id: parseInt(document.getElementById('productCategory').value),
            description: document.getElementById('productDescription').value,
            img: document.getElementById('productImage').value
        };

        // Get form data for product_item table
        const productItemData = {
            SKU: generateSKU(productData.name), // Helper function to generate SKU
            stock_qty: parseInt(document.getElementById('productStock').value),
            img: document.getElementById('productImage').value,
            price: parseFloat(document.getElementById('productPrice').value),
            store_id: parseInt(document.getElementById('productStore').value) // Added productStore value
        };

        try {
            // Send data to server
            const response = await fetch('/api/products/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product: productData,
                    productItem: productItemData
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            
            messageContainer.innerHTML = `
                <div class="success-message">
                    Product "${productData.name}" has been successfully added!
                </div>
            `;

            // Clear form
            productForm.reset();

        } catch (error) {
            console.error('Error:', error);
            messageContainer.innerHTML = `
                <div class="error-message">
                    Failed to add product. Please try again.
                </div>
            `;
        }
    });

    // Helper function to generate SKU
    function generateSKU(productName) {
        const timestamp = Date.now().toString().slice(-4);
        const namePrefix = productName.slice(0, 3).toUpperCase();
        return `${namePrefix}-${timestamp}`;
    }
});



