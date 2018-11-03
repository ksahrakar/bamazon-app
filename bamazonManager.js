var Table = require("cli-table");
var mysql = require("mysql");
var inq = require("inquirer");

var conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

var q1=(
    {type:"list",
    message:"What do you wish to do?",
    name:"choices",
    choices:["View Products","View Low Inventory","Add Inventory","Add Product"]}
);

inq.prompt(q1).then(function(resp){
    switch(resp.choices){
        case "View Products":vwProd();break;
        case "View Low Inventory":vwLow();break;
        case "Add Inventory":addInv();break;
        case "Add Product":addProd();break;
    }
});

function vwProd(){
    console.log("You have chosen to view product...")
};

function vwLow(){
    console.log("You have chosen to view low inventory...")
};

function addInv(){
    console.log("You have chosen to add inventory...")
};

function addProd(){
    console.log("You have chosen to add a product...")
};