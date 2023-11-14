# PR-Nebula License Reporter for NPM Packages
## Introduction
Welcome to the License Reporter for Node.js Packages! This tool is especially handy for developers who need to ensure compliance with the licenses of the various NPM packages used in their projects. It generates a comprehensive report in CSV format, listing the licenses of all dependencies and development dependencies declared in your project's package.json file.

## Problem
In modern front-end development, especially with frameworks like React, a typical project depends on a multitude of NPM packages. These packages, in turn, have their own dependencies, creating a complex web of interconnected libraries. For instance, a simple "Hello World" app in React can involve as many as 2,839 individual packages - [according to this article.](https://medium.com/frontendweb/find-how-many-packages-we-need-to-run-a-react-hello-world-app-695fbb755af7#:~:text=Unfortunately%2C%20the%20list%20of%20packages,it%20is%20true%20because) This complexity stems from the modular nature of JavaScript development, where developers often rely on external libraries for even basic functionalities.

Given this vast number of dependencies, each with its own licensing terms, manually checking licenses for compliance becomes impractical and tedious. This reality is what prompted the creation of the script you've developed. It automates the process of gathering license information from this extensive and nested list of packages, thereby simplifying compliance checks and saving significant time and effort for developers.

## Features
- **Simple and Efficient:** Generates a license report with just a few commands.
- **Comprehensive:** Covers both dependencies and development dependencies.
- **Readable Format:** Outputs a CSV file with package names, descriptions, authors, and license types.

## Requirements
- Node.js environment.
- npm-registry-fetch, fs, csv-write-stream, and path modules (usually installed with Node.js).

## Installation
No separate installation is required! Just ensure you have Node.js and the necessary modules in your project.

## Usage Instructions
1. Clone or Download the Script: Place the script in your project directory.
2. Navigate to Your Project Directory: Open a terminal and navigate to your project directory.
3. Run the Script: Execute the script by running:

```bash
node [script-name].js path/to/your/package.json
```

Replace `script-name` with the name of the script file and `path/to/your/package.json` with the relative or absolute path to your project's package.json file.

The script will generate a file named npm_packages.csv in the same directory, containing the license report.

## Output Format
The generated CSV file will include the following columns:

- **Name:** The name of the package.
- **Short Description:** A brief description of the package.
- **Author/Provider:** The name of the package author or provider.
- **License:** The type of license the package is under.

## Limitations
To prevent accidental catastrophic events in case of reccurring circular dependecy which could manifest as a space-time continuum rapture (or you might end up downloading whole internet), this script is currently limited to fetch a maximum of 2000 packages. This limit can be adjusted as needed in the script (see `maxNoPckg` variable).

In case of any errors during fetching, the script will log the error and continue.

## Contributing
Feel free to fork, modify, or contribute to this tool! Any improvements or suggestions are welcome.

## License

MIT 

## Contact

[You can find me on LinkedIn](https://www.linkedin.com/in/vedran-s/)
