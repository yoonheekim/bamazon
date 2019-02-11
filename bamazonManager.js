var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require('console.table');

var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    user: "root", 
    password : "001059jyh",
    database : "bamazon"
});
function options(){
    inquirer.prompt([
        {
            name : "menu",
            message : "Select one of the menu options",
            type : "list",
            choices : ["View Products for Sale",
                       "View Low Inventory",
                       "Add to Inventory",
                       "Add New Product",
                       "Quit"]
        }
    ])
    .then(function(answer){
        switch(answer.menu){
            case "View Products for Sale":
                return viewProducts();
            case "View Low Inventory":
                return viewLowInventory();
            case "Add to Inventory":
                return addInventory();
            case "Add New Product":
                return addNewProduct();
            case "Quit":
                connection.end();
        }
    });
}


function viewProducts(){
    connection.query("select * from products"
    , function(err, res){
        if(err) throw err;
        console.log("\n-----------------------------------------------------");
        console.log("View all items");
        console.log("-----------------------------------------------------\n");
        console.table(res);
        console.log("\n");
        options();
    });
    
};
function viewLowInventory(){
    connection.query("SELECT * FROM products where stock_quantity < 5"
    ,function(err, res){
        if(err) throw err;
        console.log("\n-----------------------------------------------------");
        console.log("Items with an inventory count lower than five");
        console.log("-----------------------------------------------------\n");
        console.table(res);
        console.log("\n");
        options();
    });

};
function addInventory(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
    
        inquirer.prompt([
            {
                name: "item",
                message: "Which item would you like to add more?",
                type: "list",
                choices: function(){
                    var choiceArr = [];
                    for(var i=0; i<res.length; i++){
                        choiceArr.push(res[i].product_name);
                    }
                    return choiceArr;
                }
            },
            {
                name: "quantity",
                message: "How many do you want to add ??",
                type: "input",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                }
            }
        ])
        .then(function(answer){
            connection.query("SELECT * FROM products WHERE ?"
            ,[{
                product_name: answer.item
            }]
            , function(err, res){
                if(err) throw err;
                // console.log(res[0].stock_quantity);
                // console.log(answer.quantity);
                // console.log("---------------------------"+(parseInt(res[0].stock_quantity)+parseInt(answer.quantity)));
                 connection.query("UPDATE products SET ? WHERE?",
                 [{
                     stock_quantity: (parseInt(res[0].stock_quantity)+parseInt(answer.quantity))
                 },{
                     product_name: answer.item
                 }]
                 ,function(err, res){
                     if(err) throw err;
                     console.log("\n-----------------------------------------------------");
                     console.log("added "+answer.quantity+" "+answer.item+"(s) to the inventory");
                     console.log("-----------------------------------------------------\n");
                     options();
                 });

            });
         });
    });
    //options();
    
};
function addNewProduct(){
    inquirer.prompt([
        {
            name: "product",
            message: "Input an item to add"
        },
        {
            name: "department",
            message: "Input department of the item added"
        },
        {
            name: "price",
            message: "Input the price of the item added",
            validate: function(value) {
				if (isNaN(value) === false) {
					return true;
				}
				return false;
			}
        },
        {
            name: "quantity",
            message: "Input how many quantity of the item added",
            validate: function(value) {
				if (isNaN(value) === false) {
					return true;
				}
				return false;
			}
        }
    ])
    .then(function(answer){
        connection.query("INSERT INTO products SET ?"
        ,[{
            product_name: answer.product,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity
        }]
        ,function(err, res){
            if(err) throw err;
            console.log("\n-----------------------------------------------------");
            console.log("added new item : "+answer.product+", "+answer.department+
            ", "+answer.price+"($), "+answer.quantity+"(qty)");
            console.log("-----------------------------------------------------\n");
            options();
        });

    })
};

options();