USE company_db;

INSERT INTO department (name)
VALUES (Marketing),
        (Sales),
        (Finance),
        (Human Resources),
        (Operations);

INSERT INTO role (title, salary, department_id)
VALUES ('Marketing Lead', 80000, 1),
        ('Salesperson', 90000, 2),
        ('Accountant', 90000, 3),
        ('Human Resource Manager', 100000, 4),
        ('Developer', 120000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Wick', 1, 1),
        ('Morty', 'Sanchez', 2, 3),
        ('Mark', 'Smith', 2, NULL),
        ('Chris', 'Munoz', 3, 5),
        ('Grant', 'Beach', 3, NULL),
        ('Timothy', 'Kershaw', 4, 6),
        ('Rick', 'Sanchez', 5, NULL),
        ('Heather', 'Bower', 5, 7),
        ('Morgan', 'Carter', 5, 7),
        ('Mateo', 'Wolfgang', 5, 7);