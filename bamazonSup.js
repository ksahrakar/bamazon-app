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

var table = new Table({
    head: ['Dept ID','Dept Name','Overhead','Sales','Profit']
  , colWidths: [8,30,8,8,8]
});

inq.prompt([
  {type:"list",
  message:"What do you need to do?",
  name:"choice",
  choices:["Add department","View sales","Exit"]}
]).then(ans1 => {
  switch(ans1.choice) {
    case "Exit":console.log("Thanks for stopping by!");break;
    case "View sales": viewSales();break;
    case "Add department": newDept();break;
  }
});

function viewSales(){
  console.log("You have chosen to view sales...");
  var depts=[];
  conn.query(`select distinct department_name from products`, function(err,res) {
    if (err) throw err;
    //console.log(res);
    res.forEach(el=>{
      console.log(el);
      conn.query(`insert into departments (sales) values ${el.sum(item_sales)} from products where department_name = '${el.department_name}'`,function(err2,res2){
        if (err2) throw err2;
        console.log("Sales updated!");conn.end();
      });
    });
  });  
}

function newDept(){
  console.log("You have chosen to create a new department...");
}
