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
                       "Create New Department"]
        }
    ])
    .then(function(answer){
        switch(answer.menu){
            case "View Product Sales by Department":
                return viewProductsSales();
            case "Create New Department":
                return createNewDepartment();
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

        console.table(res);
   
    });

};
function createNewDepartment(){

}

options();