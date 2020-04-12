const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// create path to output folder for fs.writeFile
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// define function with inquirer to gather information about the development team members
function questionBlock() {
    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What role does the team member serve?",
            choices: ["Manager","Engineer","Intern"]
        },
        {
            type: "input",
            name: "name",
            message: "What is his/her NAME?"
        },
        {
            type: "input",
            name: "id",
            message: "What is his/her ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is his/her EMAIL?"
        },
        {
            type: "input",
            name: "github",
            message: "What is his/her GitHub URL?",
            when: (answers) => answers.role === "Engineer"
        },
        {
            type: "input",
            name: "school",
            message: "What is his/her School?",
            when: (answers) => answers.role === "Intern"
        },
        {
            type: "input",
            name: "office",
            message: "What is his/her Office Number?",
            when: (answers) => answers.role === "Manager"
        },
        {
            type: "list",
            name: "restart",
            message: "Do you have more team members to add?",
            choices: ["Yes","No"]
        },
    ])
};

// function adding one new class of EE
const addToArray = (answers) =>{
    let employee = {};
    if (answers.role === "Manager"){
        employee = new Manager(answers.name,answers.id,answers.email,answers.office);
    }
    else if (answers.role === "Engineer"){
        employee = new Engineer(answers.name,answers.id,answers.email,answers.github);
    }
    else {
        employee = new Intern(answers.name,answers.id,answers.email,answers.school);
    }
    return employee;
}

// 
const mainLoop = (array) => {
    
    let employees = array;

    questionBlock()
    .then(answers => {
        // array for employees
        let employee = addToArray(answers);

        employees.push(employee);

        if (answers.restart === "No"){
            const htmlPage = render(employees);

            fs.writeFile(outputPath,htmlPage, function(err){
                if(err){
                    console.log(err)
                }
                else{
                    console.log("Generated HTML in Outputs folder");
                }
            })
        }
        else{
            return mainLoop(employees);
            
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

mainLoop([]);