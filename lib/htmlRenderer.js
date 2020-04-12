const path = require("path");
const fs = require("fs");

// Access to HTML files in templates folder
const templatesDir = path.resolve(__dirname, "../templates");



// create the render function passing a parameter "employees"
const render = employees => {

  // Emplty arry called html to store team member snip its of html
  const html = [];

  // 1st filter our array to get only "Manager"s.
  // 2nd use map to enact the renderManager function for every instance in arry
  // we push this(these) rendered manager HTML's to the html array
  html.push(employees
    .filter(employee => employee.getRole() === "Manager") 
    .map(manager => renderManager(manager)) 
  );
  html.push(employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  );
  html.push(employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))
  );

  return renderMain(html.join(""));

};

// function that finds the manager template html. Implements the function replacePlaceholders to add this manager object's info into the HTML
const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.getName());
  template = replacePlaceholders(template, "role", manager.getRole());
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "id", manager.getId());
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
  return template;
};

// function that finds the engineer template html. Implements the function replacePlaceholders to add this engineer object's info into the HTML
const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  return template;
};

// function that finds the intern template html. Implements the function replacePlaceholders to add this intern object's info into the HTML
const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
  return template;
};

// replace the word "team" with contents of all HTML array content containing team member html segments
const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html);
};

// identify a placeholder text in a given file with a new value
const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

// export function
module.exports = render;
