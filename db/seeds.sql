-- USE company_db;

INSERT INTO department (name)
VALUES ('Marketing'),
        ('Sales'),
        ('Finance'),
        ('Human Resources'),
        ('Operations');

-- SELECT * FROM role JOIN department ON role.department = department.id;
SELECT * FROM department;

INSERT INTO role (title, salary, department)
VALUES ('Marketing Lead', 80000, 1),
        ('Salesperson', 90000, 2),
        ('Accountant', 90000, 3),
        ('Human Resource Manager', 100000, 4),
        ('Developer', 120000, 5);

-- SELECT * FROM employee JOIN role ON employee.role_id = role.id;
SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id, manager)
VALUES ('John', 'Wick', 1, NULL),
        ('Morty', 'Sanchez', 2, 1),
        ('Mark', 'Smith', 2, NULL),
        ('Chris', 'Munoz', 3, 2),
        ('Grant', 'Beach', 3, NULL),
        ('Timothy', 'Kershaw', 4, 3),
        ('Rick', 'Sanchez', 5, NULL),
        ('Heather', 'Bower', 5, 4),
        ('Morgan', 'Carter', 5, 5),
        ('Mateo', 'Wolfgang', 5, 6);

        SELECT * FROM employee;