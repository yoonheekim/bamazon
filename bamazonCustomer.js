var inquirer = require("inquirer");
var mysql = require("mysql");


var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    user: "root", 
    password : "001059jyh",
    database : "bamazon"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readItems();
    //ask();
});

function readItems(){
    var query = connection.query("select * from products"
    , function(err, res){
        if(err) throw err;
        for(var i=0; i<res.length; i++){
            console.log("Item ID: "+res[i].item_id+
            " || Name : "+res[i].product_name+
            " || Department : "+res[i].department_name+
            " || Price : "+res[i].price+
            " || Quantity : "+res[i].stock_quantity);
        }
    });
    //console.log(query.sql);
    ask();
};

function ask(){
    inquirer.prompt([
        {
            name: "id",
            message: "What's the ID of the product to buy?"
        },{
            name: "amount",
            message: "How many units of the product you want to buy?"
        }
    ])
    .then(function(answer){
        checkQuantity(answer.id, answer.amount);
    })
};

function checkQuantity(id, amount){
    connection.query("select stock_quantity, price from products where ?",
    {
        item_id : id
    }
    , function(err, res){
        if(err) throw err;
        console.log(res);
        if(res[0].stock_quantity>=amount){
            var stocks = res[0].stock_quantity-amount;
            connection.query("UPDATE products SET ? WHERE ?",
            [{
                stock_quantity: stocks
            }, 
            {
                item_id: id
            }, function(err, res){
                if(err) throw err;
                console.log(res);
            }], function(err){
                if(err) throw err;
                console.log("Your order has been placed ! ");
                console.log("Total cost : "+amount*res[0].price);
            });
        } else {
            console.log("Insufficient quantity!");
        }
    });
    //console.log(query.sql);
}