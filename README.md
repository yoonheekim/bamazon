# Bamazon

## Overview
1. Amazon-like storefront with the MySQL skills.
2. The app takes in orders from customers and deplete stock from the store's inventory.
3. App can track product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.

## Technologies
> Node.js, MySQL

## MySQL
1. Table products
    ```
    * item_id (unique id for each product)
    * product_name (Name of product)
    * department_name
    * price (cost to customer)
    * stock_quantity (how much of the product is available in stores)
    * product_sales 
    ```
2. Table departments
    ```
    * department_id
    * department_name
    * over_head_costs (A dummy number you set for each department)
    ```

## 1. Customer View
> Node application called `bamazonCustomer.js`

1. The application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
2. The app should then prompt users with two messages.
    * The first should ask them the ID of the product they would like to buy.
    * The second message should ask how many units of the product they would like to buy.
3. Once the customer has placed the order, the application should check if store has enough of the product to meet the customer's request.
    * If store does have enough of the product, you should fulfill the customer's order.
    ```
    * This means updating the SQL database to reflect the remaining quantity.
    * Once the update goes through, show the customer the total cost of their purchase.
* Price of the product multiplied by the quantity purchased is added to the product's `product_sales` column.
    ```
* Screenshot
![alt text](https://raw.githubusercontent.com/yoonheekim/bamazon/master/images/bamazonCustomer.jpg)

## 2. Manager View
> Node application called `bamazonManager.js`

1. List a set of menu options:
    ```
    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product
    ```
    * Screenshot
    ![alt text](https://raw.githubusercontent.com/yoonheekim/bamazon/master/images/bamazonManagerOptions.jpg)
    1. `View Products for Sale`
        * The app lists every available item: the item IDs, names, prices, and quantities.
        * Screenshot
        ![alt text](https://raw.githubusercontent.com/yoonheekim/bamazon/master/images/bamazonManager1.jpg)

    2. `View Low Inventory`
        * It lists all items with an inventory count lower than five.
        * Screenshot
        ![alt text](https://raw.githubusercontent.com/yoonheekim/bamazon/master/images/bamazonManager2.jpg)

    3. `Add to Inventory`
        * The app displays a prompt that will let the manager "add more" of any item currently in the store.
        * Screenshot
        ![alt text](https://raw.githubusercontent.com/yoonheekim/bamazon/master/images/bamazonManager3-1.jpg)
        ![alt text](https://raw.githubusercontent.com/yoonheekim/bamazon/master/images/bamazonManager3-2.jpg)

    4. `Add New Product`
        * It allows the manager to add a completely new product to the store.
        * Screenshot
        ![alt text](https://raw.githubusercontent.com/yoonheekim/bamazon/master/images/bamazonManager4.jpg)


## 3. Supervisor View
> Node application called `bamazonSupervisor.js`

1. List a set of menu options:
    ```
    * View Product Sales by Department
    * Create New Department
    ```
    * Screenshot
    ![alt text](https://raw.githubusercontent.com/yoonheekim/bamazon/master/images/bamazonSupervisorOprions.jpg)
    1. `View Product Sales by Department`
        * The app displays a summarized table in their terminal/bash window
        * The `total_profit` column is calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` is not stored in any database. (using GROUP BY, JOINS)
        * Screenshot
        ![alt text](https://raw.githubusercontent.com/yoonheekim/bamazon/master/images/bamazonSupervisor1.jpg)

    2. `Create New Department`
        * It allows the Supervisor to add a completely new department to the store.
        * Screenshot
        ![alt text](https://raw.githubusercontent.com/yoonheekim/bamazon/master/images/bamazonSupervisor2.jpg)