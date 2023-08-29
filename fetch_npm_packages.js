const fetch = require("npm-registry-fetch");
const fs = require("fs");
const csvWriter = require("csv-write-stream");
const path = require("path");

const writer = csvWriter({
  headers: ["Name", "Short Description", "Author/Provider", "License"],
});
writer.pipe(fs.createWriteStream("npm_packages.csv"));

const fetchedPackages = new Set();
let rowCount = 0;
let maxNoPckg = 2000;

const fetchPackageInfo = async (packageName) => {
  if (fetchedPackages.has(packageName) || rowCount >= maxNoPckg) {
    return;
  }

  try {
    const response = await fetch.json(
      `https://registry.npmjs.org/${packageName}`
    );
    const pkgInfo = response.versions[response["dist-tags"].latest];

    const name = pkgInfo.name || "";
    const description = pkgInfo.description || "";
    const author = pkgInfo.author ? pkgInfo.author.name || "" : "";
    const license = pkgInfo.license || "";

    writer.write([name, description, author, license]);
    rowCount++;

    console.log(`Fetched ${rowCount} packages so far.`);

    fetchedPackages.add(packageName);

    if (pkgInfo.dependencies) {
      for (const dep in pkgInfo.dependencies) {
        await fetchPackageInfo(dep);
      }
    }
  } catch (error) {
    console.error(`Failed to fetch package ${packageName}: ${error}`);
  }
};

const main = async () => {
  const packageJsonPath = process.argv[2];
  if (!packageJsonPath) {
    console.log("Please provide the path to the package.json file.");
    return;
  }

  const packageJson = require(path.resolve(packageJsonPath));
  const { dependencies, devDependencies } = packageJson;

  const allDependencies = { ...dependencies, ...devDependencies };

  for (const dep in allDependencies) {
    await fetchPackageInfo(dep);
  }

  writer.end();
  console.log("CSV file has been written.");
};

main();
