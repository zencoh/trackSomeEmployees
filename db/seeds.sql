-- USE company_db;

INSERT INTO department (name)
VALUES ('Marketing'),
        ('Sales'),
        ('Finance'),
        ('Human Resources'),
        ('Operations');

SELECT * FROM role JOIN department ON role.department = department.id;

INSERT INTO role (title, salary, department)
VALUES ('Marketing Lead', 80000, 1),
        ('Salesperson', 90000, 2),
        ('Accountant', 90000, 3),
        ('Human Resource Manager', 100000, 4),
        ('Developer', 120000, 5);

SELECT * FROM employee JOIN role ON employee.role_id = role.id;

INSERT INTO employee (first_name, last_name, role_id, manager)
VALUES ('John', 'Wick', 1, NULL),
        ('Morty', 'Sanchez', 2, 3),
        ('Mark', 'Smith', 2, NULL),
        ('Chris', 'Munoz', 3, 5),
        ('Grant', 'Beach', 3, NULL),
        ('Timothy', 'Kershaw', 4, 6),
        ('Rick', 'Sanchez', 5, NULL),
        ('Heather', 'Bower', 5, 7),
        ('Morgan', 'Carter', 5, 7),
        ('Mateo', 'Wolfgang', 5, 7);