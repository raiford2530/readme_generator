const inquirer = require('inquirer');
const fs = require('fs');

inquirer.prompt([
    {
        type: "input",
        message: "Enter the name of your application repository. ",
        name: "repoName"
    }
]).then(response => {
    
    fs.writeFile("README.md", generateReadMe(response), "utf8", (err) =>{
        if(err) throw err;

        console.log('Successfully created README file.');
    })
})

function generateReadMe(data){
    return `# ${data.repoName}\n`;
}

