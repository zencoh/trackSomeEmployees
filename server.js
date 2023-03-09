const express = require('express');
const inquirer = require('inquirer');
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

promptUser();

const promptUser = () => {
  inquirer.prompt([
      {
        name: 'choices',
        type: 'list',
        message: 'Please select an option:',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add Department',
          'Add Role',
          'Add Employee'
          ]
      }
    ])
    .then((answers) => {
      const {choices} = answers;
      if (choices === 'View All Departments') {
        viewAllDepartments();
      }
      if (choices === 'View All Roles') {
        viewAllRoles();
      }
      if (choices === 'View All Employees') {
        viewAllEmployees();
      }
      if (choices === 'Add Department') {
        addDepartment();
      }
      if (choices === 'Add Role') {
        addRole();
      }
      if (choices === 'Add Employee') {
        addEmployee();
      }
  });
};

const viewAllDepartments = () => {
  db.query(`SELECT department.id AS id, department.name AS department FROM department`, function (err, results) {
    printTable(results);
  });
  promptUser();
};

const viewAllRoles = () => {
  db.query(`SELECT role.id, role.title, role.salary, department_id FROM role JOIN department ON role.department_id = department.id`, function (err, results) {
    printTable(results);
  });
  promptUser();
};

const viewAllEmployees = () => {
  db.query(`SELECT employee.id, employee.first_name, employee.last_name, role_id FROM employee JOIN role ON employee.role_id = role.id, manager_id FROM employee ON employee.manager_id = employee.id`, function (err, results) {
    printTable(results);
  });
  promptUser();;
};

const addDepartment = () => {
  inquirer.prompt([
      {
        name: 'newDepartment',
        type: 'input',
        message: 'What is the name of Department?',
      }
    ])
    .then((answer) => {
      db.query(`INSERT INTO department (department_name) VALUES (?)`, function (err, results) {
        printTable(results);
      });
      console.log(answer.newDepartment + ` Department successfully created!`);
      viewAllDepartments();
    });
};

const addRole = () => {
  db.query('SELECT * FROM department', function (err, results) {
    if (err) throw err;
    let deptNamesArr = [];
    results.forEach((department) => {deptNamesArray.push(department.department_name)});
  });
  deptNamesArray.push('Create Department');
    inquirer.prompt([
      {
        name: 'departmentName',
        type: 'list',
        message: 'Which department is this new role in?',
        choices: deptNamesArray
      }
    ]).then((answer) => {
      if (answer.departmentName === 'Create Department') {
        this.addDepartment();
        } else {
          addRoleResume(answer);
        }
    });
}
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
