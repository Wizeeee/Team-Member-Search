const fs = require("fs");
const inquirer = require("inquirer");
const generateHtml = require("./src/page-template");
const Intern = require("./lib/Intern.js");
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");

const employeeArray = [];

const promptManager = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your Managers name? (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter a valid name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "What is your Managers ID? (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter a valid ID");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is your Managers office number? (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter a valid office number");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "What is your Managers email address? (Required)",
        validate: (linkInput) => {
          if (linkInput) {
            return true;
          } else {
            console.log("Please enter a valid email address (Required)");
            return false;
          }
        },
      },
      {
        type: "checkbox",
        name: "addEmployee",
        message: "Would you like to add another Employee to your team?",
        choices: ["Engineer", "Intern", "None"],
      },
    ])
    .then((managerData) => {
      const { name, id, email, officeNumber, addEmployee } = managerData;
      const manager = new Manager(name, id, email, officeNumber);
      employeeArray.push(manager);

      if (addEmployee[0] === "Engineer") {
        return promptEngineer();
      } else if (addEmployee[0] === "Intern") {
        return promptIntern();
      } else {
        return employeeArray;
      }
    });
};
const promptEngineer = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your Engineers name? (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter a valid name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "What is your Engineers ID? (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter a valid ID");
            return false;
          }
        },
      },

      {
        type: "input",
        name: "email",
        message: "What is your Engineers email address? (Required)",
        validate: (linkInput) => {
          if (linkInput) {
            return true;
          } else {
            console.log("Please enter a valid email address");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "github",
        message: "What is your Engineers GitHub username?",
        validate: (githubInput) => {
          if (githubInput) {
            return true;
          } else {
            console.log("Please enter a valid GitHub username");
          }
        },
      },
      {
        type: "checkbox",
        name: "addEmployee",
        message: "What you like to add another Employee to your team?",
        choices: ["Engineer", "Intern", "None"],
      },
    ])
    .then((engineerData) => {
      const { name, id, email, github, addEmployee } = engineerData;
      const engineer = new Engineer(name, id, email, github);
      employeeArray.push(engineer);
      if (addEmployee[0] === "Engineer") {
        return promptEngineer();
      } else if (addEmployee[0] === "Intern") {
        return promptIntern();
      } else {
        return employeeArray;
      }
    });
};
const promptIntern = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your Interns name? (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter a valid name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "What is your Interns ID? (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter a valid ID");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "What is your Intern email address? (Required)",
        validate: (linkInput) => {
          if (linkInput) {
            return true;
          } else {
            console.log("Please enter a valid email address");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "school",
        message: "What is the name of your Interns school? (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter a valid school name");
            return false;
          }
        },
      },
      {
        type: "checkbox",
        name: "addEmployee",
        message: "What you like to add another Employee to your team?",
        choices: ["Engineer", "Intern", "None"],
      },
    ])
    .then((internData) => {
      const { name, id, email, school, addEmployee } = internData;
      const intern = new Intern(name, id, email, school);
      employeeArray.push(intern);
      if (addEmployee[0] === "Engineer") {
        return promptEngineer();
      } else if (addEmployee[0] === "Intern") {
        return promptIntern();
      } else {
        return employeeArray;
      }
    });
};

promptManager()
  .then((employeeArray) => {
    return generateHtml(employeeArray);
  })
  .then((data) => {
    console.log("Your Crew has been created");
    return writeFile(data);
  })
  .catch((err) => {
    console.log(err);
  });

// writing files
const writeFile = (fileContent) => {
  return new Promise((resolve, reject) => {
    fs.writeFile("./dist/index.html", fileContent, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: "Your Team was created!",
      });
    });
  });
};
