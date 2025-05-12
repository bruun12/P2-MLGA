import { insertProduct, insertProduktID, insertAddress, insertStore } from "../models/admin-model.js";
import dbPool from "../database/database.js";

export async function addProduct(req, res) {
    const { product, productItem } = req.body;

    // Input validation
    if (
        !product || !product.category_id || !product.name || !product.description || !product.img ||
        !productItem || !productItem.SKU || !productItem.stock_qty || !productItem.img || !productItem.price || !productItem.store_id
    ) {
        console.error('validation error:', {product, productItem}); // Log the request body for debugging
        return res.status(400).json({
            success: false,
            error: 'Invalid input. Please provide all required fields for product and productItem.'
        });
    }

    try {
        const connection = await dbPool.getConnection();
        await connection.beginTransaction();

        try {
            console.log('Product:', product);
            const productResult = await insertProduct(product);
            const productId = productResult.insertId; 

            console.log('product insertId:', productId); // Log the product ID for debugging

            console.log('Product ID:', productId); // Log the product ID for debugging
            const productItemResult = await insertProduktID({...productItem, product_id: productId}); // Pass the productId to the insert function

            console.log('ProductItem inserted:', productItemResult); // Log the product item ID for debugging

            await connection.commit();
            connection.release();

            res.json({
                success: true,
                message: 'Product added successfully',
                productId: product.id // Assuming `product.id` exists
            });

        } catch (error) {
            await connection.rollback();
            connection.release();
            console.error('Error inserting product or product item:', error); // Log the error for debugging
            res.status(500).json({
                success: false,
                error: 'Failed to add product or product item'
            });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to add product'
        });
    }
}

export async function createNewStore(req, res) {
    const { name, img, address, phone } = req.body;

    if (!name || !img || !address || !phone) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const { street, city, zip, country_id } = address;

    if (!street || !city || !zip || !country_id) {
        return res.status(400).json({ message: 'Address fields are required.' });
    }

    const connection = await dbPool.getConnection();
    try {
        await connection.beginTransaction();

        
        const addressResult = await insertAddress(street, city, zip, country_id);
        const addressId = addressResult.insertId;

        
        const storeResult = await insertStore(name, img, addressId, phone);

        await connection.commit();
        res.status(201).json({ message: 'Store created successfully.', storeId: storeResult.insertId });
    } catch (error) {
        await connection.rollback();
        console.error('Error creating store:', error);
        res.status(500).json({ message: 'An error occurred while creating the store.' });
    } finally {
        connection.release();
    }
};