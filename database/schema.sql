-- Subject to changes, missing aspects: types, IF NOT EXIST, some FOREIGN KEYS, other constraints
CREATE TABLE IF NOT EXISTS product (
  id INT AUTO_INCREMENT,
  category_id INT,
  prod_name VARCHAR(50) NOT NULL,
  prod_descr VARCHAR(250),
  prod_img VARCHAR(250),
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS store (
  id INT AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  img VARCHAR(250),
  address_id INT,
  phone VARCHAR(250),
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS country (
  id INT AUTO_INCREMENT,
  country_name VARCHAR(50),
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `address` (
  id INT AUTO_INCREMENT,
  address_type ENUM('billing', 'shipping') NOT NULL,
  street VARCHAR(250),
  city VARCHAR(250),
  zip VARCHAR(10),
  country_id INT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`country_id`) REFERENCES `country`(`id`)
);

CREATE TABLE IF NOT EXISTS category (
  id INT AUTO_INCREMENT,
  parent_id INT,
  cat_name VARCHAR(250),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id`) REFERENCES `category`(`parent_id`)
);

CREATE TABLE IF NOT EXISTS variation (
  id INT AUTO_INCREMENT,
  category_id INT,
  variation_name VARCHAR(250),
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS variation_opt (
  id INT AUTO_INCREMENT,
  variation_id INT,
  opt_value VARCHAR(250),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`variation_id`) REFERENCES `variation`(`id`)
);

CREATE TABLE IF NOT EXISTS product_item (
  id INT AUTO_INCREMENT,
  product_id INT,
  SKU VARCHAR(250),
  stock_qty INT,
  prod_item_img VARCHAR(250),
  price INT,
  store_id INT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `product`(`id`)
);

CREATE TABLE IF NOT EXISTS item_variation_mapping (
  product_item_id INT,
  variation_opt_id INT,
  FOREIGN KEY (`variation_opt_id`) REFERENCES `variation_opt`(`id`),
  FOREIGN KEY (`product_item_id`) REFERENCES `product_item`(`id`)
);

CREATE TABLE IF NOT EXISTS `event` (
  id INT AUTO_INCREMENT,
  store_id INT,
  img VARCHAR(250),
  title VARCHAR(50),
  `description` VARCHAR(250),
  `date` VARCHAR(250),
  address_id INT,
  customer_id INT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`address_id`) REFERENCES `address`(`id`)
);

CREATE TABLE IF NOT EXISTS customer (
  id INT AUTO_INCREMENT,
  email VARCHAR(250),
  first_name VARCHAR(250),
  last_name VARCHAR(250),
  address_id INT,
  phone VARCHAR(250),
  `is_member` BOOLEAN DEFAULT FALSE,
  `password` VARCHAR(250) NOT NULL,
  `favorite_id` INT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`address_id`) REFERENCES `address`(`id`),
  FOREIGN KEY (`favorite_id`) REFERENCES `favorite`(`id`)
);

CREATE TABLE IF NOT EXISTS `store_order` (
  `id` INT AUTO_INCREMENT,
  `order_line_id` INT,
  `customer_id` INT,
  `store_id` INT,
  `total` DECIMAL(10, 2),
  `status` ENUM('pending', 'completed', 'cancelled') NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`store_id`) REFERENCES `store`(`id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`)
);

CREATE TABLE IF NOT EXISTS `customer_order` (
  `order_number` INT AUTO_INCREMENT,
  `customer_id` INT,
  `first_name` VARCHAR(250),
  `last_name` VARCHAR(250),
  `address_id` INT,
  `date` DATETIME,
  `total` DECIMAL(10, 2),
  PRIMARY KEY (`order_number`),
  FOREIGN KEY (`address_id`) REFERENCES `address`(`id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`)
);

CREATE TABLE IF NOT EXISTS `order_line` (
  `id` INT AUTO_INCREMENT,
  `order_number` INT,
  `product_item_id` INT,
  `status` ENUM('pending', 'shipped', 'delivered', 'cancelled') NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_item_id`) REFERENCES `product_item`(`id`),
  FOREIGN KEY (`order_number`) REFERENCES `customer_order`(`order_number`)
);

CREATE TABLE IF NOT EXISTS `favorite` (
  `id` INT AUTO_INCREMENT,
  `product_item_id` INT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_item_id`) REFERENCES `product_item`(`id`)
);