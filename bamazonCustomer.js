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

connection.connect(function(err){
    if(err) throw err;
    //console.log("connected as id " + connection.threadId + "\n");
    readItems();
    
});

function readItems(){
    connection.query("select * from products"
    , function(err, res){
        if(err) throw err;
        console.log("\n----------------------------------------------------------------------------------------------------------");
        console.table(res);
        // for(var i=0; i<res.length; i++){
        //     console.table("Item ID: "+res[i].item_id+
        //     " || Name : "+res[i].product_name+
        //     " || Department : "+res[i].department_name+
        //     " || Price : "+res[i].price+
        //     " || Quantity : "+res[i].stock_quantity);
        // };
        console.log("----------------------------------------------------------------------------------------------------------\n");
        ask();
    });
    //connection.end();
    //----------------------------------------------------Q
    // ask();
};

function ask(){
    inquirer.prompt([
        {
            name: "id",
            message: "What's the ID of the product to buy?",
            validate: function(value) {
				if (isNaN(value) === false) {
					return true;
				}
				return false;
			}
        },{
            name: "amount",
            message: "How many units of the product you want to buy?",
            validate: function(value) {
				if (isNaN(value) === false) {
					return true;
				}
				return false;
			}
        }
    ])
    .then(function(answer){
        checkQuantity(answer.id, answer.amount);
    })
};

function checkQuantity(id, amount){
    connection.query("select stock_quantity, price, product_sales from products where ?",
    {
        item_id : id
    }
    , function(err, res){
        if(err) throw err;
        //console.log(res);
        if(res[0].stock_quantity>=amount){
            var stocks = res[0].stock_quantity-amount;
            var totalCost = amount*res[0].price
            var totslsales = res[0].product_sales+totalCost;
            updateStocksSales(id, stocks, totalCost.toFixed(2), totslsales.toFixed(2));
        } else {
            console.log("\n-----------------------------------------------------");
            console.log("Insufficient quantity!");
            console.log("-----------------------------------------------------\n");
            connection.end();
        };

    });
    //connection.end();
}

function updateStocksSales(id, stocks, totalCost, totslsales){
    connection.query("UPDATE products SET ? WHERE ?",
    [{
        stock_quantity: stocks,
        product_sales: totslsales
    }, 
    {
        item_id: id
    }]
    , function(err, res){
        if(err) throw err;
        console.log("\n-----------------------------------------------------");
        console.log("Your order has been placed ! ");
        console.log("Total cost : "+totalCost);
        console.log("Product Sales are updated ! ");
        console.log("-----------------------------------------------------\n");
    });

    connection.end();
};
