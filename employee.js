const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "jidmenosta",
    database: "top_songsdb"
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    start();
});

const start = () => {
    displayLogo();
    userInput();
};

const userInput = () => {
    inquirer
    .prompt ({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Employees by Department', 'View All Employees by Role', 'Add Employee', 'Delete Employee', 'Update Employee Role', 'Add Department', 'Add Role', 'Exit']
    })
    .then((answer) => {
        switch (answer.choice) {
            case 'View All Employees':
                viewAll();
                break;
            case 'View All Employees by Department':
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

