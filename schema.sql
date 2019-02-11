DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(100),
    price DECIMAL(10, 2),
    stock_quantity INT,
    product_sales DECIMAL(10, 2),
    PRIMARY KEY(item_id)
);

CREATE TABLE departments(
	department_id INT NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(100),
	over_head_costs DECIMAL(10, 2),
    PRIMARY KEY(department_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES("milk", "Food", 1.88, 10, 400),
("apple", "Food", 0.99, 100, 600),
("toilet paper", "Health & Household", 25.55, 8, 150),
("notebooks", "Office Product", 8.99, 10, 400),
("tumbler", "Kitchen & Dining", 18.00, 8, 180),
("sunglasses", "Clothing", 33.99, 5, 600),
("i-pad", "Electronics", 329.99, 10, 3000),
("yoga pants", "Clothing", 14.20, 3, 250),
("coffee maker", "Kitchen & Dining", 47.25, 7, 500),
("vitamin complex", "Health & Household", 12.31, 6, 600);

INSERT INTO departments(department_name, over_head_costs)
VALUES("Food", 700),
("Health & Household", 200),
("Office Product", 200),
("Kitchen & Dining", 400),
("Clothing", 300),
("Electronics", 800);