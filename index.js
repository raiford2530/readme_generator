const inquirer = require("inquirer");
const fs = require("fs");

//Prompts for user to input README information
inquirer
  .prompt([
    {
      type: "input",
      message: "Enter the title of your project. ",
      name: "projectTitle",
    },
    {
      type: "input",
      message: "Enter a description for your project. ",
      name: "projectDescription",
    },
    {
      type: "input",
      message: "Enter instructions for installation. ",
      name: "installInstructions",
    },
    {
      type: "input",
      message: "Enter usage information. ",
      name: "usageInformation",
    },
    {
      type: "input",
      message: "Enter test instructions. ",
      name: "testInstructions",
    },
    {
      type: "input",
      message: "Enter contribution guidelines. ",
      name: "contributionGuidelines",
    },
    {
      type: "input",
      message: "Enter your GitHub username. ",
      name: "githubUsername",
    },
    {
      type: "input",
      message: "Enter youre email. ",
      name: "email",
    },
    {
      type: "list",
      message: "Select a license. ",
      name: "license",
      choices: [
        {
          name: "GNU AGPLv3",
          value: "GNU AGPLv3",
        },
        {
          name: "GNU GPLv3",
          value: "GNU GPLv3",
        },
        {
          name: "GNU LGPLv3",
          value: "GNU LGPLv3",
        },
        {
          name: "Mozilla Public License 2.0",
          value: "Mozilla Public License 2.0",
        },
        {
          name: "Apache License 2.0",
          value: "Apache License 2.0",
        },
        {
          name: "MIT License",
          value: "MIT License",
        },
        {
          name: "Boost Software License 1.0",
          value: "Boost Software License 1.0",
        },
        {
          name: "The Unlicense",
          value: "The Unlicense",
        },
      ],
      default: "MIT License",
    },
  ])
  .then((response) => {

    //Throws an error if the user doesn't input the minimal information for readme: title and description
    if(!(response.projectTitle && response.projectDescription)){
        throw new Error("Project title or description is missing.")
    }
    
    //Write readme file
    fs.writeFile("README.md", generateReadMe(response), "utf8", (err) => {
      if (err) throw err;

      console.log("Successfully created README file.");
    });
  });

//Generates markdown for readme file
function generateReadMe(data) {
  const license = getBadge(data.license);
  let tableOfContents = getTableOfContents(data);
  let readmeString = "";

  if (data.projectTitle) {
    readmeString += `# ${data.projectTitle}        ![License](${license}\n\n`;
  }

  if (data.projectDescription) {
    readmeString += `## Description  \n${data.projectDescription}\n\n`;
  }

  if (tableOfContents.length > 0) {
    readmeString += `## Table of Contents  \n`;

    for (let i = 0; i < tableOfContents.length; i++) {
      let item = tableOfContents[i];
      readmeString += `[${item}](#${item})  \n`;
    }

    readmeString += "\n";
  }

  if (data.installInstructions) {
    readmeString += `## Installation\n${data.installInstructions}\n\n`;
  }

  if (data.usageInformation) {
    readmeString += `## Usage  \n${data.usageInformation}\n\n`;
  }

  if (data.testInstructions) {
    readmeString += `## Tests  \n${data.testInstructions}\n\n`;
  }

  if (data.contributionGuidelines) {
    readmeString += `## Contributing  \n${data.contributionGuidelines}\n\n`;
  }

  if (data.githubUsername || data.email) {
    readmeString += `## Questions \n`;

    if (data.githubUsername) {
      readmeString += `Visit my [GitHub Profile](https://www.github.com/${data.githubUsername})  \n`;
    }

    if (data.email) {
      readmeString += `For additional questions, contact me by email at ${data.email}.  \n`;
    }

    readmeString += "\n";
  }

  if (data.license) {
    readmeString += `## License  \nThis project is licensed under ${data.license}\n\n`;
  }

  return readmeString;
}

//Generate badge based on selected license
function getBadge(license) {
  let badge;

  switch (license) {
    case "GNU AGPLv3":
      badge = { name: "GNU+AGPLv3", color: "orange" };
      break;
    case "GNU GPLv3":
      badge = { name: "GNU+GPLv3", color: "red" };
      break;
    case "GNU LGPLv3":
      badge = { name: "GNU+LGPLv3", color: "blue" };
      break;
    case "Mozilla Public License 2.0":
      badge = { name: "Mozilla+2.0", color: "yellow" };
      break;
    case "Apache License 2.0":
      badge = { name: "Apache+2.0", color: "green" };
      break;
    case "MIT License":
      badge = { name: "MIT", color: "brightgreen" };
      break;
    case "Boost Software License 1.0":
      badge = { name: "Boost+Software+1.0", color: "yellowgreen" };
      break;
    case "The Unlicense":
      badge = { name: "The+Unlicense", color: "blueviolet" };
      break;
  }

  return `https://img.shields.io/static/v1?label=license&message=${badge.name}&color=${badge.color})`;
}

//Creates table of contents based on inputs supplied
function getTableOfContents(data) {
  let tableOfContents = [];

  if (data.installInstructions) {
    tableOfContents.push("Installation");
  }

  if (data.usageInformation) {
    tableOfContents.push("Usage");
  }

  if (data.testInstructions) {
    tableOfContents.push("Tests");
  }

  if (data.contributionGuidelines) {
    tableOfContents.push("Contributing");
  }

  if (data.githubUsername || data.email) {
    tableOfContents.push("Questions");
  }

  if (data.license) {
    tableOfContents.push("License");
  }

  return tableOfContents;
}
