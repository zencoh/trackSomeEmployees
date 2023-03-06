const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const { printTable } = require('console-table-printer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'carCoding23',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

// Query database
db.query('SELECT * FROM department', function (err, results) {
  printTable(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
