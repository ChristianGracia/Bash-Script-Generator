# Bash Installation Script Generator

This repository is for an NPM package I made that creates a script of chained installation commands for JavaScript/TypeScript, Linux, Python environments based on user input.

You can read dependencies from a file like requirements.txt for Python or package.json for JavaScript/TypeScript.

If you do not have dependency files or want to use an unsupported language you can hardcode in your dependencies as seen below

---

Editing nonVersionedDependencies Array when version does not matter

Ex. install python3-dev and python3-pip without specific version

```
// This is for arrays of package names when version isn't important
// Leave this as empty array unless you want to hardcode each package
const nonVersionedDependencies = [
	"python3-dev",
	"python3-pip"
];
```

---

Editing versionedDependencies object when specific versions is required

Ex. install pip at 20.3.4 and requests as 2.25.1

```
// This is for an object with keys equal to package names and values of the package version for when specific version is important
// Leave this as empty object unless you want to hardcode in the package + version
const versionedDependencies = {
	pip: "20.3.4",
	requests: "2.25.1",
};

```

---

## Installation

`npm i --dev`

## Use

run the following command where language is the installation language (Ex. Python would be `pip install`, Linux would use sudo `apt-get install`) and VERSIONING_REQUIRED is a Boolean value equal to whether or not these packages need specific versions installed

`npm run start -- LANGUAGE VERSIONING_REQUIRED`

Python dependencies - Pip

Run in terminal
`npm run start -- python true`

---

**IN PROGRESS**

JavaScript/TypeScript - NPM

Run in terminal
`npm run start -- javascript true`

Debian Linux - APT

`npm run start -- linux true`
