

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
  console.log(res);
  prompt.start();
  var schema = {
    properties: {
      item: {
        description:"What would you like to buy (insert id)?"
      },
      quantity: {
        description:"How many?",
        type: "number",
        message: "Must be a number"
      }
    }
  };

  prompt.get(schema, function (err, result) {
    console.log("You said you want to buy: " +result.quantity+ " of item " + result.item);
  });
});



// prompt.start();
//   prompt.get({
//     properties: {
//       item: {
//         description:"What is your name?"
//       }
//     }
//   }, function (err, result) {
//     console.log("You said you want to buy: " + result.item);
//   });



// connection.query("INSERT INTO products SET ?", {
//   flavor: "Rocky Road",
//   price: 3.00,
//   quantity: 50
// }, function(err, res) {});

// connection.query("UPDATE products SET ? WHERE ?", [{
//   quantity: 100
// }, {
//   flavor: "Rocky Road"
// }], function(err, res) {});

// connection.query("DELETE FROM products WHERE ?", {
//   flavor: "strawberry"
// }, function(err, res) {});

// connection.query("SELECT * FROM products", function(err, res) {
//   if (err) throw err;
//   console.log(res);
// });