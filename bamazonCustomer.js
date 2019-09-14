var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306, 
    user: "root", 
    password: "", 
    database: "bamazon_db"
});

connection.connect(function(err){
    if(err) throw err;
    displayProducts();
});

function displayProducts(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        console.table(res);
        askCustomerId(res);
    });
}


function askCustomerId(inventory){
    inquirer.prompt([
        {
            name: "choice",
            type: "input",
            message: "What's the ID of the product you want to purchase?",
        }
    ]).then(function(value){

        checkFunction(value.choice);
        var choiceId = parseInt(value.choice);
        var product = checkInventory(choiceId, inventory);

        if(product){
            checkUnits(product);
        }else{
            console.log("Sorry, no product found! :( ");
            displayProducts();
        }
    });
}

function checkUnits(product) {

    inquirer.prompt([
        {
            name: "quantity",
            type: "input",
            message: "How many units do you want to purchase?",
        }
    ]).then(function(value){

        checkFunction(value.quantity);
        var quantity = parseInt(value.quantity);

        if(quantity > product.stock_quantity){
           console.log("Sorry! Insufficient quantity!");
           displayProducts();
        }
        else{
            filingOrder(product, quantity);
        }
    });
}

function filingOrder(product, quantity) {
    connection.query(
      "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
      [quantity, product.item_id],
      function(err, res) {
        console.log("Successfully purchased " + quantity + " " + product.product_name + "'s!");
        displayProducts();
      }
    );
  }

  function checkInventory(choiceId, inventory) {
    for (var i = 0; i < inventory.length; i++) {
      if (inventory[i].item_id === choiceId) {
        return inventory[i];
      }
    }
    return null;
  }
  
  function checkFunction(choice) {
    if (choice.toLowerCase() === "q") {
    
      console.log("Goodbye!");
      process.exit(0);
    }
  }