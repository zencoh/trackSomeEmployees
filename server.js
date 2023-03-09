const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const { printTable } = require('console-table-printer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'carCoding23',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

// promptUser();

const promptUser = () => {
  inquirer.prompt([
      {
        name: 'choices',
        type: 'list',
        message: 'Please select an option:',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update and Employee Role']
      }
    ]) .then((answers) => {
      switch (answers.promptUser) {
        case 'View all Departments':
          viewAllDepartments();
          break;
        case 'View all Roles':
          viewAllRoles();
          break;
        case 'View all Employees':
          viewAllEmployees();
          break;
        case 'Add a Department':
          addDepartment();
          break;
        case 'Add a Role':
          addRole();
          break;
        case 'Add an Employee':
          addEmployee();
          break;
        case 'Update an Employee Role':
          updateRole();
    }
  }) .catch((err) => {
    console.log(err);
  });
};

const viewAllDepartments = () => {
  db.query(`SELECT * FROM department`, function (err, results) {
    printTable(results);
    promptUser();
  });
};

const viewAllRoles = () => {
  db.query(`SELECT * FROM role`, function (err, results) {
    printTable(results);
    promptUser();
  });
};

const viewAllEmployees = () => {
  db.query(`SELECT * FROM employee`, function (err, results) {
    printTable(results);
    promptUser();
  });
}; 

const addDepartment = () => {
  inquirer.prompt([
      {
        type: 'input',
        name: 'newDepartment',
        message: 'What is the name of Department?'
      }
    ])
    .then((answers) => {
      db.query(`INSERT INTO department (department.name) VALUES (?)`, [answers.newDepartment], function (err, results) {
        console.log(answers.newDepartment + ' Department successfully created!');
        promptUser();
      });
    });
};

const addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'newRole',
      message: 'What is the new Role?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the Salary for this Role?'
    },
    {
      type: 'input',
      name: 'department',
      message: 'What Department does this Role belong to?'
    }
  ]) .then((answers) => {
    const departmentId = Number.parseInt(answers.department);
    const salaryNumber = Number.parseInt(answers.salary);
    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.newRole, salaryNumber, departmentId], function (err, results) {
      console.log(answers.newRole + ' Role successfully created!');
      promptUser();
    })
  })
}

const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'newEmployee',
      message: 'What is the employees first name?'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is the employees last name?'
    },
    {
      type: 'input',
      name: 'role',
      message: 'What Role does this employee have?'
    },
    {
      type: 'input',
      name: 'manager',
      message: 'Who is this employees manager?'
    }
  ]) .then ((answers) => {
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?)`, [answers.newEmployee, answers.lastName, answers.manager], function (err, results) {
      console.log(answers.newEmployee + ' Employee successfully created!');
      promptUser();
    })
  })
}

const updateRole = () => {
  inquirer.prompt ([
    {
      type: 'input',
      name: 'newRole',
      message: 'What is their new Role?'
    }
  ]) .then((answers) => {
    db.query(``, [answers.newRole], function (err, results) {
      console.log(answers.newRole + ' Role successfully Updated!');
      promptUser();
    })
  })
}

promptUser();

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
