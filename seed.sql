USE company_db;

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (01, 'Jid', 'Menosta', 01, 0), (02, 'Richard', 'Kessler', 02, 0), (03, 'Steve', 'Austin', 3, 0), (04, 'Paul', 'Levesque', 6, 3), (5, 'Dewayne', 'Johnson', 6, 3), (6, 'Joey', 'Styles', 5, 0), (7, 'Paul', 'Haymen', 4, 0), (8, 'Ray', 'Rice', 10, 6), (9, 'Mark', 'LoMonaco', 9, 7), (10, 'Devon', 'Hughes', 8, 2), (11, 'Bill', 'Walsh', 7, 1);

INSERT INTO department (id, name)
VALUES (1, 'Enginerring'), (2, 'Finance'), (3, 'Champion'), (4, 'Legal'), (5, 'Human Resources');

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Lead Engineer', 150000, 1), (2, 'CFO', 160000, 2), (3, 'Champ', 140000, 3), (4, 'Head Counsel', 120000, 4), (5, 'HR Head', 135000, 5), (6, 'Contender', 120000, 3), (7, 'Software Engineer', 125000, 1), (8, 'Accountant', 130000, 2), (9, 'Lawyer', 100000, 4), (10, 'Specialist', 115000, 5)