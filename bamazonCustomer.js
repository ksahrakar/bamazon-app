var Table = require("cli-table");
var mysql = require("mysql");
var inq = require("inquirer");

var table = new Table({
    head: ['Product ID', 'Product Name','Price']
  , colWidths: [12,30,8]
});

var conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

var q1=(
    {type:"input",
    message:"What item do you wish to purchase?\nPlease enter the product ID.'x' for none.",
    name:"productID"}
);

var q2=(
    {type:"input",
    message:"How many?",
    name:"quant"}
);


conn.connect(function(err) {
    if (err) throw err;
    console.log("\nWELCOME!\nYou are connected to the BAM!!(azon) Marketplace as id "+conn.threadId+"!");
    console.log("...where every item arrives in 2 hours for $5.00!!\n\n")
    conn.query(`select * from products`, function(err,dbres){
        if (err) throw err;
        //console.log(res);
        for (i=0;i<dbres.length;i++){
            table.push([dbres[i].item_id,dbres[i].product_name,dbres[i].price]);
        }
        console.log(table.toString());
        inq.prompt(q1).then(resp=>{
            //console.log(resp.productID);
            for (j=0;j<dbres.length;j++){
                var quanAvail;
                var selPrice;
                var sales;
                if (dbres[j].item_id==resp.productID){
                    quanAvail=dbres[j].stock_quantity;
                    selPrice=dbres[j].price;
                    sales=dbres[j].item_sales;
                }
            }
            if (resp.productID!="x"){
                inq.prompt(q2).then(resp2=>{
                    //console.log(parseInt(resp2.quant));
                    console.log("");
                    if (parseInt(resp2.quant)<=quanAvail){
                        sales += resp2.quant*selPrice;
                        var ordTotal=(1.08*selPrice*resp2.quant)+(5*resp2.quant);
                        console.log("B-A-M!!(azon) You will have your items(s) in 2 hours!\nYour order total is $"+ordTotal.toFixed(2)+" inclusive tax and shipping!\nYour credit card on file has been charged $"+ordTotal.toFixed(2)+"!\nItems(s) will be delivered to the address on file.")
                        console.log("");
                        console.log("Thanks for shopping BAM!!(azon)!")
                        console.log("");
                        // SQL command //
                        // update products
                        // set stock_quantity = (quanAvail-resp2.quant)
                        // where item_id="resp.productID";
                        conn.query(`update products set stock_quantity = ${(quanAvail-resp2.quant)}, item_sales = ${sales} where item_id='${resp.productID}'`,function(err,errResp){
                            if(err) {throw(err);console.log(errResp);conn.end()}else{conn.end()};
                        });
                    } else {console.log("Unfortunately, we cannot fill that order as we are low in stock!");conn.end()};
                });
            } else {console.log("Have a nice day!"); conn.end()};    
        }); 
    });
});




