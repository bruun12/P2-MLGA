-- Subject to changes, missing aspects: types, IF NOT EXIST, some FOREIGN KEYS, other constraints
CREATE TABLE `product` (
  `id` INT AUTO_INCREMENT,
  `category_id` <type>,
  `prod_name` <type>,
  `prod_descr` <type>,
  `prod_img` <type>,
  PRIMARY KEY (`id`)
);

CREATE TABLE `store` (
  `id` <type>,
  `name` <type>,
  `img` <type>,
  `address_id` <type>,
  `phone` <type>,
  PRIMARY KEY (`id`)
);

CREATE TABLE `country` (
  `id` <type>,
  `country_name` <type>,
  PRIMARY KEY (`id`)
);

CREATE TABLE `address` (
  `id` <type>,
  `address_type` <type>,
  `street` <type>,
  `city` <type>,
  `zip` <type>,
  `country_id` <type>,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`country_id`) REFERENCES `country`(`id`)
);

CREATE TABLE `category` (
  `id` <type>,
  `parent_id` <type>,
  `cat_name` <type>,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id`) REFERENCES `category`(`parent_id`)
);

CREATE TABLE `variation` (
  `id` <type>,
  `category_id` <type>,
  `variation_name` <type>,
  PRIMARY KEY (`id`)
);

CREATE TABLE `variation_opt` (
  `id` <type>,
  `variation_id` <type>,
  `opt_value` <type>,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`variation_id`) REFERENCES `variation`(`id`)
);

CREATE TABLE `product_item` (
  `id` <type>,
  `product_id` <type>,
  `SKU` <type>,
  `stock_qty` <type>,
  `prod_item_img` <type>,
  `price` <type>,
  `store_id` <type>,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `product`(`id`)
);

CREATE TABLE `item_variation_mapping` (
  `product_item_id` <type>,
  `variation_opt_id` <type>,
  FOREIGN KEY (`variation_opt_id`) REFERENCES `variation_opt`(`id`),
  FOREIGN KEY (`product_item_id`) REFERENCES `product_item`(`id`)
);

CREATE TABLE `event` (
  `id` <type>,
  `store_id` <type>,
  `img` <type>,
  `title` <type>,
  `description` <type>,
  `date` <type>,
  `address_id` <type>,
  `customer_id//tilmeldte` <type>,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`address_id`) REFERENCES `address`(`id`)
);

CREATE TABLE `customer` (
  `id` <type>,
  `email` <type>,
  `first_name` <type>,
  `last_name` <type>,
  `address_id` <type>,
  `phone` <type>,
  `isMember` <type>,
  `password` <type>,
  `favorite_id` <type>,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`address_id`) REFERENCES `address`(`id`)
);

CREATE TABLE `store_order` (
  `id` <type>,
  `order_line_id` <type>,
  `customer_id` <type>,
  `store_id` <type>,
  `total` <type>,
  `status` <type>,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`store_id`) REFERENCES `store`(`id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`)
);

CREATE TABLE `customer_order` (
  `order_number` <type>,
  `customer_id` <type>,
  `first_name` <type>,
  `last_name` <type>,
  `address_id //fakturering` <type>,
  `date` <type>,
  `total` <type>,
  PRIMARY KEY (`order_number`),
  FOREIGN KEY (`address_id //fakturering`) REFERENCES `address`(`id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`)
);

CREATE TABLE `order_line` (
  `id` <type>,
  `order_number` <type>,
  `product_item_id` <type>,
  `status` <type>,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_item_id`) REFERENCES `product_item`(`id`),
  FOREIGN KEY (`id`) REFERENCES `store_order`(`order_line_id`),
  FOREIGN KEY (`order_number`) REFERENCES `customer_order`(`order_number`)
);

CREATE TABLE `favorite` (
  `id` <type>,
  `product_item_id` <type>,
  PRIMARY KEY (`id`)
);

