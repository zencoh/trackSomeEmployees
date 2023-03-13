// const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const { printTable } = require('console-table-printer');

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
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
      choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role']
    }
  ]).then((answers) => {
    if (answers.choices === 'View All Departments') {
      viewAllDepartments();
    }

    if (answers.choices === 'View All Roles') {
      viewAllRoles();
    }

    if (answers.choices === 'View All Employees') {
      viewAllEmployees();
    }

    if (answers.choices === 'Add Department') {
      addDepartment();
    }

    if (answers.choices === 'Add Role') {
      addRole();
    }

    if (answers.choices === 'Add Employee') {
      addEmployee();
    }

    if (answers.choices === 'Update Employee Role') {
      updateRole();
    }
  });
}

const viewAllDepartments = () => {
  db.query(`SELECT * FROM department`, function (err, results) {
    printTable(results)
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
  ]).then((answers) => {
    db.query(`INSERT INTO role SET ?`, {
      title: answers.newRole,
      salary: answers.salary,
      department: answers.department
    })
    console.log(answers.newRole + ' Role successfully created!');
    promptUser();
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
  ]).then((answers) => {
    db.query(`INSERT INTO employee SET ?`, {
      first_name: answers.newEmployee,
      last_name: answers.lastName,
      role_id: answers.role,
      manager: answers.manager
    })
    console.log(answers.newEmployee + ' Employee successfully created!');
    promptUser();
  })
}

const updateRole = () => {
  const employeeSql = `SELECT * FROM employee`;
  db.query(employeeSql, (err, result) => {
    if (err) throw err;

    const employees = result.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which employee would you like to update?",
        choices: employees
      }
    ])
      .then(empChoice => {
        const employee = empChoice.name;
        const params = [];
        // params = [name]
        params.push(employee);

        const roleSql = `SELECT * FROM role`;

        db.query(roleSql, (err, result) => {
          if (err) throw err;
          const roles = result.map(({ id, title }) => ({ name: title, value: id }));

          inquirer.prompt([
            {
              type: 'list',
              name: 'role',
              message: "What is the employee's new role?",
              choices: roles
            }
          ])
            .then(roleChoice => {
              const role = roleChoice.role;
              // params = [name, role]
              params.push(role);
              // params = [e = name, role]
              let employee = params[0]
              // params = [role, e = name,]
              params[0] = role
              params[1] = employee

              const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

              db.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log("Employee has been updated!");

                promptUser();
              });
            });
        });
      });
  });
}

promptUser();

// Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
