import dbPool from "../database/database.js";

export async function insertProduct(product) {
    const connection = await dbPool.getConnection();
    try {
        console.log('Executing insertProduct with product:', product); // Log the product for debugging
        const [productResult] = await connection.query(
            'INSERT INTO product (category_id, name, description, img) VALUES (?, ?, ?, ?)',
            [product.category_id, product.name, product.description, product.img]
        );
        console.log('Product insert result:', productResult); // Log the result for debugging
        return productResult; // Return the result to capture insertId
    } catch (error) {
        console.error('Error in insertProduct:', error); // Log the error for debugging
        throw error; // Rethrow the error to be handled by the calling function
    } finally {
        connection.release(); // Ensure the connection is released even if an error occurs
    }
}

export async function insertProduktID(productItem) {
    const connection = await dbPool.getConnection();
    try {
        console.log('Executing insertProduktID with productItem:', productItem); // Log the productItem for debugging
        const [productItemResult] = await connection.query(
            'INSERT INTO product_item (product_id, SKU, stock_qty, img, price, store_id) VALUES (?, ?, ?, ?, ?, ?)',
            [productItem.product_id, productItem.SKU, productItem.stock_qty, productItem.img, productItem.price, productItem.store_id]
        );
        console.log('ProductItem insert result:', productItemResult); // Log the result for debugging
        return productItemResult; // Return the result to capture insertId
    } catch (error) {
        console.error('Error in insertProduktID:', error); // Log the error for debugging
        throw error; // Rethrow the error to be handled by the calling function
    } finally {
        connection.release(); // Ensure the connection is released even if an error occurs
    }
}

export async function insertAddress(street, city, zip, country_id) {
    const [addressResult] = await connection.query(
        `INSERT INTO address (street, city, zip, country_id) 
        VALUES (?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
        [street, city, zip, country_id]
    );
    return addressResult; // Return the result to capture insertId
}

export async function insertStore(name, img, addressId, phone) {
    const [storeResult] = await connection.query(
        `INSERT INTO store (name, img, address_id, phone) VALUES (?, ?, ?, ?)`,
        [name, img, addressId, phone]
    );
    return storeResult; // Return the result to capture insertId
}

