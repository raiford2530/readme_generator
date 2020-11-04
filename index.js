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
    }
]).then(response => {
    
    fs.writeFile("README.md", generateReadMe(response), "utf8", (err) =>{
        if(err) throw err;

        console.log('Successfully created README file.');
    })
})

function generateReadMe(data){
    return `# ${data.projectTitle}\n\n` +
           `## Description\n${data.projectDescription}\n\n`;
}

