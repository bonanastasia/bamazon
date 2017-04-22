var prompt = require("prompt");
var mysql = require("mysql");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});
connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }

    prompt.start();
    var schema = {
        properties: {
            item: {
                description: "What would you like to buy (insert id)?"
            },
            quantity: {
                description: "How many?",
                type: "number",
                message: "Must be a number"
            }
        }
    };

    prompt.get(schema, function(err, result) {
        console.log("You said you want to buy: " + result.quantity + " of item " + result.item);

        connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;




            connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?', [result.quantity, result.item], function(error) {
                if (error) {
                    throw err;
                }
                console.log("Purchase made successfully");
            });

        });
    });
});


