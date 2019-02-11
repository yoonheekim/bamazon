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
            choices : ["View Product Sales by Department",
                       "Create New Department", 
                       "Quit"]
        }
    ])
    .then(function(answer){
        switch(answer.menu){
            case "View Product Sales by Department":
                return viewProductsSales();
            case "Create New Department":
                return createNewDepartment();
            case "Quit":
                connection.end();
        }
    });
}

function viewProductsSales(){
    connection.query("SELECT d1.department_id, d1.department_name, d1.over_head_costs,"+
    " sum(p1.product_sales) as product_sales, sum(p1.product_sales)-d1.over_head_costs as total_profit "+
    "FROM departments d1 LEFT JOIN products p1 "+
    "ON d1.department_name = p1.department_name "+
    "group by p1.department_name;", function(err, res){
        if(err) throw err;
        console.log("\n----------------------------------------------------------------------------------------------------------\n");
        console.table(res);
        console.log("----------------------------------------------------------------------------------------------------------\n");
        options();
    });
    

};
function createNewDepartment(){
    inquirer.prompt([
        {
            name: "department",
            message: "Input new department to add"
        },
        {
            name: "overHeadCost",
            message: "Input over head cost of new department",
            validate: function(value) {
				if (isNaN(value) === false) {
					return true;
				}
				return false;
			}
        }
    ])
    .then(function(answer){
        connection.query("INSERT INTO departments SET ?"
        ,[{
            department_name: answer.department,
            over_head_costs: answer.overHeadCost
        }]
        ,function(err, res){
            if(err) throw err;
            console.log("\n-----------------------------------------------------");
            console.log("added new department : "+answer.department+
            ", Over head cost : "+answer.overHeadCost);
            console.log("-----------------------------------------------------\n");
            options(); 
        });
    })
}

options();