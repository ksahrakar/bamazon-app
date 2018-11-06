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
    head: ['Product ID', 'Product Name', 'Price', 'Stock']
  , colWidths: [12,30,8,8]
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
    console.log("You have chosen to view product...");
    conn.query(`select * from products`, function(err,dbres){
        if (err) throw err;
        //console.log(res);
        for (i=0;i<dbres.length;i++){
            table.push([dbres[i].item_id,dbres[i].product_name,dbres[i].price,dbres[i].stock_quantity]);
        }
        console.log(table.toString());
        conn.end();
    });
};

function vwLow(){
    console.log("You have chosen to view low inventory...");
    conn.query(`select * from products where stock_quantity<5;`, function(err,dbres){
        if (err) throw err;
        //console.log(res);
        for (i=0;i<dbres.length;i++){
            table.push([dbres[i].item_id,dbres[i].product_name,dbres[i].price,dbres[i].stock_quantity]);
        }
        console.log(table.toString());
        conn.end();
    });
};

function addInv(){
    console.log("You have chosen to add inventory...")
    conn.connect(function(err){
        if(err) throw err;
        var quanAvail = 0;
        var q2=(
            {type:"input",
            message:"What item are you restocking?\nPlease enter the product ID.'x' for none.",
            name:"productID"}
        );
        var q3=(
            {type:"input",
            message:"How many?",
            name:"quant"}
        );
        conn.query(`select * from products`, function(err,dbres){
            if (err) throw err;
            //console.log(res);
            for (i=0;i<dbres.length;i++){
                table.push([dbres[i].item_id,dbres[i].product_name,dbres[i].stock_quantity]);
            }
            console.log(table.toString());
            inq.prompt(q2).then(resp=>{
                for (j=0;j<dbres.length;j++){
                    var quanAvail;
                    if (dbres[j].item_id==resp.productID){
                        quanAvail=dbres[j].stock_quantity;
                    }
                }
                if (resp.productID!="x"){
                    inq.prompt(q3).then(resp2=>{
                        //console.log(parseInt(resp2.quant));
                        console.log("");
                        // SQL command //
                        // add products
                        // set stock_quantity = (quanAvail+resp2.quant)
                        // where item_id="resp.productID";
                        quanAvail+=parseInt(resp2.quant);
                        conn.query(`update products set stock_quantity = ${quanAvail} where item_id='${resp.productID}';`,function(err,errResp){
                            if(err) {throw(err);console.log(errResp);conn.end()}else{console.log("Stock quantity updated to "+quanAvail);conn.end()};
                        });
                    });
                } else {console.log("Have a nice day!"); conn.end()};
            });
        });    
    });
};

function addProd(){
    console.log("You have chosen to add a product...")
    var q4=(
        {type:"input",
        message:"Please create a new product ID (Five-digit number).",
        name:"productID"}
    );
    var q5=(
        {type:"list",
        message:"What department?",
        name:"choices",
        choices:["apparel","cell phones","cell phone accessories","electronic accessories"]}
    );
    var q6=(
        {type:"input",
        message:"Enter product name",
        name:"product_name"}
    );
    var q7=(
        {type:"input",
        message:"Enter product price",
        name:"price"}
    );
    var q8=(
        {type:"input",
        message:"Enter number you are stocking",
        name:"stock_quantity"}
    );
    inq.prompt(q4).then(resp4=>{
        var newItem=[];
        inq.prompt(q5).then(resp5=>{
            newItem[2]=resp5.choices;
            switch(resp5.choices){
                case "apparel":newItem[0]="APP"+resp4.productID;break;
                case "cell phones":newItem[0]="CP"+resp4.productID;break;
                case "cell phone accessories":newItem[0]="CPA"+resp4.productID;break;;
                case "electronic accessories":;newItem[0]="EA"+resp4.productID;break;
            }
            inq.prompt(q6).then(resp6=>{
                newItem[1]=resp6.product_name;
                inq.prompt(q7).then(resp7=>{
                    newItem[3]=parseInt(resp7.price);
                    inq.prompt(q8).then(resp8=>{
                        newItem[4]=parseInt(resp8.stock_quantity);
                        conn.connect(function(err){
                            if(err) throw err;
                            //console.log(newItem);
                            conn.query(`insert into products (item_id,product_name,department_name,price,stock_quantity) values ('${newItem[0]}','${newItem[1]}','${newItem[2]}',${newItem[3]},${newItem[4]})`,function(err,errResp){
                                if (err) {throw err; console.log(errResp); conn.end();}
                                else {console.log("Item successfully added!"); conn.end();}
                            });
                        });
                    });
                });
            });
        });
    });
};