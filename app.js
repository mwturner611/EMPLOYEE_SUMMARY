const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Write code to use inquirer to gather information about the development team members,
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
            name: "finish",
            message: "Do you have more team members to add?",
            choices: ["Yes","No"]
        },
    ])
};


// const matt = new Engineer("Matt",12,"matt@email.com","github.com");
// const tricia = new Manager("Tricia",123,"Tricia@email.com",72);
// const employees = [matt,tricia];




// questionBlock()
// .then(answers => {
//     const employees = [];
//     if (answers.finish === "Yes"){
//         addToArray(answers);
//         const htmlPage = render(employees)

//         fs.writeFile(outputPath,htmlPage, function(err){
//             if(err){
//                 console.log(err)
//             }
//             else{
//                 console.log("Generated HTML")
//             }
//         })    
//     }
//     else{
//         console.log("let's ask more questions")
//     }})
// .catch((err) => {
//     console.log(err);
// })


questionBlock()
.then(answers => {
    const employees = [];

    let employee = addToArray(answers);

    employees.push(employee);

    const htmlPage = render(employees);

    fs.writeFile(outputPath,htmlPage, function(err){
        if(err){
            console.log(err)
        }
        else{
            console.log("Generated HTML");
        }
    })

})
.catch((err) => {
    console.log(err);
})


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

// and to create objects for each team member (using the correct classes as blueprints!)
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!