const inquirer = require("inquirer");
const fs = require("fs");

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
    fs.writeFile("README.md", generateReadMe(response), "utf8", (err) => {
      if (err) throw err;

      console.log("Successfully created README file.");
    });
  });

function generateReadMe(data) {
  const license = getBadge(data.license);

  return (
    `# ${data.projectTitle}        ![License](${license}\n\n` +
    `## Description\n${data.projectDescription}\n\n` +
    `## Table of Contents\n` +
    `[Installation](#installation)\n\n` +
    `[Usage](#usage)\n\n` +
    `[Tests](#tests)\n\n` +
    `[Contributing](#contributing)\n\n` +
    `[Questions](#questions)\n\n` +
    `[License](#license)\n\n` +
    `## Installation\n${data.installInstructions}\n\n` +
    `## Usage\n${data.usageInformation}\n\n` +
    `## Tests\n${data.testInstructions}\n\n` +
    `## Contributing\n${data.contributionGuidelines}\n\n` +
    `## License\nThis project is licensed under ${data.license}\n\n`
  );
}

function getBadge(license) {
  let badge;

  switch (license) {
    case "GNU AGPLv3":
      badge = {name: "GNU+AGPLv3", color: "orange"};
      break;
    case "GNU GPLv3":
      badge = {name: "GNU+GPLv3", color: "red"};
      break;
    case "GNU LGPLv3":
      badge = {name: "GNU+LGPLv3", color: "blue"};;
      break;
    case "Mozilla Public License 2.0":
      badge = {name: "Mozilla+2.0", color: "yellow"};;
      break;
    case "Apache License 2.0":
      badge = {name: "Apache+2.0", color: "green"};;
      break;
    case "MIT License":
      badge = {name: "MIT", color: "brightgreen"};;
      break;
    case "Boost Software License 1.0":
      badge = {name: "Boost+Software+1.0", color: "yellowgreen"};;
      break;
    case "The Unlicense":
      badge = {name: "The+Unlicense", color: "blueviolet"};;
      break;
  }

  return `https://img.shields.io/static/v1?label=license&message=${badge.name}&color=${badge.color})`;
}
