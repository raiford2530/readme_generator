const inquirer = require('inquirer');
const fs = require('fs');

inquirer.prompt([
    {
        type: "input",
        message: "Enter the title of your project. ",
        name: "projectTitle"
    },
    {
        type: "input",
        message: "Enter a description for your project. ",
        name: "projectDescription"
    },
    {
        type: "input",
        message: "Enter instructions for installation. ",
        name: "installInstructions"
    },
    {
        type: "input",
        message: "Enter usage information. ",
        name: "usageInformation"
    }
]).then(response => {
    
    fs.writeFile("README.md", generateReadMe(response), "utf8", (err) =>{
        if(err) throw err;

        console.log('Successfully created README file.');
    })
})

function generateReadMe(data){
    return `# ${data.projectTitle}\n\n` +
           `## Description\n${data.projectDescription}\n\n` + 
           `## Table of Contents\n` + 
           `[Installation](#installation)\n\n` +
           `[Usage](#usage)\n\n` + 
           `[License](#license)\n\n` +
           `[Contributing](#contributing)\n\n` +
           `[Tests](#tests)\n\n` +
           `[Questions](#questions)\n\n` + 
           `## Installation\n${data.installInstructions}\n\n` +
           `## Usage\n${data.usageInformation}\n\n`
}

