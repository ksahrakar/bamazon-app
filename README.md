## Bamazon is a command-line node.js marketplace application

## Features
* Uses sql database
* Customer and manager views
* Friendly interface
* Table view

## Dependencies
* mysql
* inquirer
* cli-table

## Architecture
* customer and manager node files that are run from the command line

### Customer file
* 2 nested sql queries - one to list all products and second to update product quantities and total sales
* tax and shipping is calculated in total sale for customer, but not included in departmetn sale total
* if order exceeds quantities in stock, purchase is not allowed

### Manager file
* inquirer allows choices to view all products, low inventory, add inventory, and add product
* automatic item id creation based on department when product is added
* attractive table view of all queries
* dynamic stock management

## Video walk-through
https://drive.google.com/file/d/1EC90rmP8noxl1075Osezfp45RYzfDq7l/view



