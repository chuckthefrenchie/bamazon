DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
    item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(40) NOT NULL,
    department_name VARCHAR(40) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
    ("Teddy Bear", "toys", 9.99, 76),
    ("Waffle Maker", "kitchen", 198.99, 10),
    ("Bamazon pencil", "office", 0.99, 245),
    ("iPhone 7+", "electronics", 899.99, 15),
    ("iPhone 6+", "electronics", 599.99, 11),
    ("Unicorn", "toys", 18.99, 90),
    ("Velvet Pillow", "home decor", 20.89, 29),
    ("Iphone Case", "electronics", 24.05, 26),
    ("Desk Lamp", "home decor", 27.99, 18),
    ("Electric kettle", "electronics", 19.99, 21)
;

SELECT * FROM products;
