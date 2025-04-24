export async function insertProduct(product) {
    const [productResult] = await connection.query(
        'INSERT INTO product (category_id, name, description, img) VALUES (?, ?, ?, ?)',
        [product.category_id, product.name, product.description, product.img]
    );
}

export async function insertProduktID(productItem) {
    const [productItemResult] = await connection.query(
        'INSERT INTO product_item (product_id, SKU, stock_qty, img, price, store_id) VALUES (?, ?, ?, ?, ?, ?)',
        [productId, productItem.SKU, productItem.stock_qty, productItem.img, productItem.price, productItem.store_id]
    );
}

export async function insertAddress(street, city, zip) {
    const [addressResult] = await connection.query(
        `INSERT INTO address (street, city, zip, country_id) 
        VALUES (?, ?, ?, 1) 
        ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
        [street, city, zip]
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

