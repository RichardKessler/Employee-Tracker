const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "jidmenosta",
    database: "company_db"
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    start();
});

const start = async () => {
    // displayLogo();
    userInput();
};

const userInput = async () => {
    inquirer
    .prompt ({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Departments', 'View All Employees by Role', 'Add Employee', 'Delete Employee', 'Update Employee Role', 'Add Department', 'Add Role', 'Exit']
    })
    .then((answer) => {
        switch (answer.choice) {
            case 'View All Employees':
                viewAll();
                break;
            case 'View All Departments':
                departmentTable();
                break;
            case 'View All Employees by Role':
                roleTable();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Delete Employee':
                deleteEmployee();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    });
}

const viewAll = async () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        userInput();
    });
}

const departmentTable = async () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        userInput();
    });
}

const roleTable = async () => {
    connection.query('SELECT * FROM role RIGHT JOIN employee ON role.id = role_id', (err, res) => {
        if (err) throw err;
        console.table(res);
        userInput();
    });
}

const addEmployee = async () => {
    
}

const deleteEmployee = async () => {
    connection.query('SELECT * FROM ')
}

const updateRole = async () => {
    connection.query('SELECT * FROM ')
}

const addDepartment = async () => {
    
}

const addRole = async () => {

}