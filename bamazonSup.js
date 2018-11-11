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
dept=[];

inq.prompt([
  {type:"list",
  message:"What do you need to do?",
  name:"choice",
  choices:["Add department","View sales","Exit"]}
]).then(ans1 => {
  switch(ans1.choice) {
    case "Exit":console.log("Thanks for stopping by!");break;
    case "View sales": 
      getDepts();
      for (i=0;i<dept.length;i++){
        conn.query(`select item_sales from products where department_name = ${dept[i]}`, function(err,res){
          if (err) throw err;
          var sum = 0;
          res.forEach(el=>{
            sum+=el.item_sales;
            console.log(sum);
          });
        conn.query(`update departments set sales = ${sum} where department_name = ${dept[i]}`, function(err2,res2){
          if (err2) throw err2
          else {conn.end()};
      })
    })
  }
      break;
    case "Add department": newDept();break;
  }
});

function viewSales(){
  console.log("You have chosen to view sales...");
  
};

function getDepts(){
  conn.query(`select distinct department_name from products`, function(err,res){
    if (err) throw err;
    res.forEach(el =>{
      dept.push(el.department_name)
    });console.log(dept);
  });conn.end();
};

function getTotals(){
  conn.query(`select item_sales from products where department_name='apparel'`, function(err,res){
    if (err) throw err;
    var sum=0;
    res.forEach
  })
}

function newDept(){
  console.log("You have chosen to create a new department...");
}
