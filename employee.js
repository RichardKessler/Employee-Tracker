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
        choices: ['View All Employees', 'View All Departments', 'View All Roles', 'View All Employees by Role', 'Add Employee', 'Delete Employee', 'Update Employee Role', 'Add Department', 'Add Role', 'Delete Role', 'Delete Department', 'Exit']
    })
    .then((answer) => {
        switch (answer.choice) {
            case 'View All Employees':
                viewAll();
                break;
            case 'View All Departments':
                departmentTable();
                break;
            case 'View All Roles':
                viewRoles();
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
            case 'Delete Role':
                deleteRole();
                break;
            case'Delete Department':
                deleteDepartment();
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

const viewRoles = async () => {
    connection.query('SELECT * FROM role', (err, res) => {
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
    connection.query('SELECT * FROM employee', (err,res) => {
        if (err) throw err;
         inquirer.prompt([{
            name: 'id',
            message: 'What is the employee"s id?'
        },
        {
            name: 'first_name',
            message: 'What is the employee"s first name?'
        },
        {
            name: 'last_name',
            message: 'What is the employee"s last name?'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is their role id?',
            choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            type: 'list',
            name: 'manager_id',
            messsage: 'Who is their manager?',
            choices: [0, 1, 2, 3, 4, 5]
        }
    ])
    .then((answer) => {
        connection.query('INSERT INTO employee SET ?', {
            id: answer.id,
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role_id,
            manager_id: answer.manager_id
        }, (err) => {
            if (err) throw err;
            console.log('New Employee Added!!');
            userInput();
        });
    });
    });
}

const deleteEmployee = async () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        inquirer.prompt([{
            type: 'list',
            name: 'name',
            message: 'Who would you like to delete?',
            choices: () => {
                let choiceArray = [];
                for (let i = 0; i < res.length; i++){
                    choiceArray.push(res[i].first_name + " " + res[i].last_name);
                }
                return choiceArray;
            },
        }
    ])
    .then((answer) => {
        let employeeName = answer.name;
        let remove = employeeName.split(' ');
        connection.query(`DELETE FROM employee WHERE first_name = "${remove[0]}" AND last_name = "${remove[1]}"`, (err) => {
            if (err) throw err;
            console.log('Employee Deleted!!');
            userInput();
        });
    });
    });
}

const updateRole = async () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        inquirer.prompt([{
            type: 'list',
            name: 'employee',
            message: "Which employee's role would you like to update?",
            choices: () => {
                let choiceArray = [];
                for (let i = 0; i < res.length; i++){
                    choiceArray.push(res[i].first_name + " " + res[i].last_name);
                }
                return choiceArray;
            },
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is their new role id?',
            choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
    ])
    .then((answer) => {
        let employeeName = answer.employee;
        let updateEmployee = employeeName.split(' ');
        let updateRole = answer.role;

        connection.query(`UPDATE employee SET role_id = "${updateRole}" WHERE first_name = "${updateEmployee[0]}" AND last_name = "${updateEmployee[1]}"`, (err) => {
            if (err) throw err;
            console.log('Role Update Complete!!');
            userInput();
        });
    });
    });
}

const addDepartment = async () => {
    inquirer.prompt([{
        name: 'id',
        message: 'What is the ID for the new department?'
    },
    {
        name: 'name',
        message: 'What is the new department called?'
    }
    ])
    .then((answer) => {
        connection.query(`INSERT INTO department SET ?`, {
        id: answer.id,
        name: answer.name
        }, (err) => {
            if (err) throw err;
            console.log('New Department Added Successfully!!');
            userInput();
        });
    });
}

const addRole = async () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        inquirer.prompt([{
            name: 'id',
            message: 'What is the ID for the new role?'            
        },
        {
            name: 'title',
            message: 'What is the title for the new role?'
        },
        {
            name: 'salary',
            message: 'What is the salary for the new role?'
        },
        {
            type: 'list',
            name: 'depID',
            message: 'What is the department ID for the new role?',
            choices: () => {
                let choiceArray = [];
                for (let i = 0; i < res.length; i++){
                    choiceArray.push(res[i].id);
                }
                return choiceArray;
            },
        }
    ])
    .then((answer) => {
        connection.query(`INSERT INTO role SET ?`, {
            id: answer.id,
            title: answer.title,
            salary: answer.salary,
            department_id: answer.depID
        }, (err) => {
            if (err) throw err;
            console.log('Role Added Successfully!!');
            userInput();
        });
    });
    });

}

const deleteRole = async () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        inquirer.prompt([{
            type: 'list',
            name: 'role',
            message: 'What role would you like to delete?',
            choices: () => {
                let choiceArray = [];
                for (let i = 0; i < res.length; i++){
                    choiceArray.push(res[i].title);
                }
                return choiceArray;
            },
        }
    ])
    .then((answer) => {
       let title = answer.role
        connection.query(`DELETE FROM role WHERE title = "${title}"`, (err) => {
            if (err) throw err;
            console.log('Role Deleted Successfully!');
            userInput();
        });
    });
    });
}

const deleteDepartment = async () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        inquirer.prompt([{
            type: 'list',
            name: 'department',
            message: 'What department would you like to delete?',
            choices: () => {
                let choiceArray = [];
                for (let i = 0; i < res.length; i++){
                    choiceArray.push(res[i].name);
                }
                return choiceArray;
            },
        }])
        .then((answer) => {
            let depName = answer.department;
            connection.query(`DELETE FROM department WHERE name = "${depName}"`, (err) => {
                if (err) throw err;
                console.log('Department Deleted!!');
                userInput();
            });
        });
    });
}