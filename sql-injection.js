// Código vulnerable a inyección SQL
const mysql = require('mysql');
const connection = mysql.createConnection({ /* config */ });

const userInput = "'; DROP TABLE users; --";
const query = `SELECT * FROM users WHERE username = '${userInput}'`;

connection.query(query, (error, results) => {
  if (error) throw error;
  console.log(results);
});