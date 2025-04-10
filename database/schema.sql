/* Subject to changes, missing aspects: type review, enum values, other constraints, referential actions, etc.
   A Referential Action tells the DBMS what to do when an update or delete operation effects the parent-child relationship columns. 
   So what happens if the primary key gets updated or deleted. restrict, cascade, set null, set default. */

/* SQL script that creates the database schema for our e-commerce application.
   Order of creation is important, as some tables depend on others (Foreign-Keys).
   Reserved words are in `backticks` to avoid conflicts with SQL syntax
*/

/* country */
CREATE TABLE IF NOT EXISTS country (
  id INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL
);

/* address */
CREATE TABLE IF NOT EXISTS `address` (
  id INT PRIMARY KEY AUTO_INCREMENT,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  zip VARCHAR(4) NOT NULL,
  country_id INT NOT NULL,
  FOREIGN KEY (country_id) REFERENCES country(id)
);

/* store */
CREATE TABLE IF NOT EXISTS store (
  id INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  img VARCHAR(255) NOT NULL,   /* url */
  address_id INT NOT NULL,
  phone VARCHAR(15) NOT NULL,  /* type reviewed, 15 digits is a worldwide standard */
  FOREIGN KEY (address_id) REFERENCES `address`(id)
);


/* category ('Clothing', 'Shoes', 'Electronics'...) */
CREATE TABLE IF NOT EXISTS category (
  id INT PRIMARY KEY AUTO_INCREMENT,
  parent_id INT,                       /* allow NULL for top-level categories */
  `name` VARCHAR(50) NOT NULL,
  FOREIGN KEY (parent_id) REFERENCES category(id)
);

/* variation ('Size', 'Color', 'Storage-capacity', 'Screen Size' ...) */
CREATE TABLE IF NOT EXISTS variation (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  FOREIGN KEY (category_id) REFERENCES category(id)
);

/* variation options ('Large', 'Midnight Black', '16 GB' ...) */
CREATE TABLE IF NOT EXISTS variation_opt (
  id INT PRIMARY KEY AUTO_INCREMENT,
  variation_id INT NOT NULL,
  `value` VARCHAR(50) NOT NULL,
  FOREIGN KEY (variation_id) REFERENCES variation(id)
);

/* product (Those shown on a products overview list page - only once despite multiple variations of product, 'Galaxy S25') */
CREATE TABLE IF NOT EXISTS product (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `description` TEXT NOT NULL,   /* type reviewed */
  img VARCHAR(255) NOT NULL,     /* url */
  FOREIGN KEY (category_id) REFERENCES category(id)
);

/* product item (Instance of product with all specific variations options - 'Galaxy S25, Midnight Black - 16 GB') */
CREATE TABLE IF NOT EXISTS product_item (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  SKU VARCHAR(50),
  stock_qty INT NOT NULL,
  img VARCHAR(255) NOT NULL,    /* url */
  price DECIMAL(8, 2) NOT NULL, /* 8 digits total, 2 after decimal. Range: -999,999.99 to 999,999.99 */
  store_id INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product(id),
  FOREIGN KEY (store_id) REFERENCES store(id)
);

/* product-item & variation mapping (Joining table that associates product items with their variations) */
CREATE TABLE IF NOT EXISTS item_variation_mapping (
  product_item_id INT NOT NULL,
  variation_opt_id INT NOT NULL,
  FOREIGN KEY (product_item_id) REFERENCES product_item(id),
  FOREIGN KEY (variation_opt_id) REFERENCES variation_opt(id)
);

/* favorite items */
CREATE TABLE IF NOT EXISTS favorite (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_item_id INT NOT NULL,
  FOREIGN KEY (product_item_id) REFERENCES product_item(id)
);

/*account*/
CREATE TABLE IF NOT EXISTS account (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE, /* type reviewed */
  `password` VARCHAR(255) NOT NULL,   /* type reviewed, hash password before storing here */
  phone VARCHAR(15),                  /* type reviewed, 15 digits is a worldwide standard */
  first_name VARCHAR(255),
  last_name VARCHAR(255)
);

/*admin*/
CREATE TABLE IF NOT EXISTS `admin` (
  account_id INT PRIMARY KEY,
  store_id INT NOT NULL,
  FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE,
  FOREIGN KEY (store_id) REFERENCES store(id)
);

/*member, who has created an account*/
CREATE TABLE IF NOT EXISTS `member` (
  account_id INT PRIMARY KEY,
  favorite_id INT NOT NULL,
  address_id INT,
  FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE,
  FOREIGN KEY (favorite_id) REFERENCES favorite(id),
  FOREIGN KEY (address_id) REFERENCES `address`(id) ON DELETE SET NULL
);

/* customer order */
CREATE TABLE IF NOT EXISTS customer_order (
  order_number INT PRIMARY KEY AUTO_INCREMENT,
  member_id INT,                    /*Allow NULL, guest purchases, otherwise get information from that*/
  email VARCHAR(255) NOT NULL,      
  phone VARCHAR(15),                /* type reviewed, 15 digits is a worldwide standard */
  first_name VARCHAR(255) NOT NULL, /* faktura name */
  last_name VARCHAR(255) NOT NULL,  /* faktura name */
  address_id INT NOT NULL,
  `date` DATETIME NOT NULL, /* or TIMESTAMP type */
  total DECIMAL(8, 2) NOT NULL, /* 8 digits total, 2 after decimal. Range: -999,999.99 to 999,999.99 */
  FOREIGN KEY (member_id) REFERENCES `member`(account_id), /* updated from customer(id) */
  FOREIGN KEY (address_id) REFERENCES `address`(id)
);

/* order line */
CREATE TABLE IF NOT EXISTS order_line (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_number INT NOT NULL,
  product_item_id INT NOT NULL,
  `status` ENUM('pending', 'accepted', 'rejected', 'pickup_ready', 'complete', 'incomplete') NOT NULL,
  FOREIGN KEY (order_number) REFERENCES customer_order(order_number),
  FOREIGN KEY (product_item_id) REFERENCES product_item(id)
);

/* store order */
CREATE TABLE IF NOT EXISTS store_order (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_line_id INT NOT NULL,
  order_number INT NOT NULL, /* references customer_order(order_number) */
  store_id INT NOT NULL,
  total DECIMAL(8, 2) NOT NULL, /* 8 digits total, 2 after decimal. Range: -999,999.99 to 999,999.99 */
  `status` ENUM('pending', 'accepted', 'rejected', 'pickup_ready', 'completed', 'incomplete') NOT NULL,
  FOREIGN KEY (order_line_id) REFERENCES order_line(id),
  FOREIGN KEY (order_number) REFERENCES customer_order(order_number), 
  FOREIGN KEY (store_id) REFERENCES store(id)
);

/* event */
CREATE TABLE IF NOT EXISTS `event` (
  id INT PRIMARY KEY AUTO_INCREMENT,
  store_id INT NOT NULL,
  img VARCHAR(255) NOT NULL, /* url */
  title VARCHAR(50) NOT NULL,
  `description` TEXT NOT NULL, /* type reviewed */
  `date` DATETIME NOT NULL, /* or TIMESTAMP type */
  address_id INT,
  member_id INT, /* updated from customer_id */
  FOREIGN KEY (store_id) REFERENCES store(id) ON DELETE CASCADE,
  FOREIGN KEY (address_id) REFERENCES `address`(id) ON DELETE SET NULL,
  FOREIGN KEY (member_id) REFERENCES `member`(account_id) ON DELETE SET NULL
);