# Bash Installation Script Generator

This repository is for an NPM package I made that creates a script of chained installation commands for JavaScript/TypeScript, Linux, and Python environments based commands given.

This tool allows you to rebuild your bash installation scripts very fast and makes it easier to maintain.

You can read dependencies from a file like requirements.txt for Python or package.json for JavaScript/TypeScript.

This is still in development so this package's main use is to generate very long scripts using hardcoded objects/arrays in the Generator class or using a file like requirements.txt to generate a long chain of pip installs or package.json for npm installs (regular dependencies and dev)

![pic](https://i.imgur.com/cKVykHp.png)

**I made this from scratch in a couple hours so this is very Work in Progress and a lot of features to be implemented**

Click the image below to watch demo

[![Video](https://i.imgur.com/v3XHNKT.png)](https://i.imgur.com/fIsW1WI.mp4)

**Other dependency installation file types will get added in the future**

If you do not have dependency files or want to use an unsupported language you can hardcode in your dependencies as seen below in **'node_modules/bash-script-dependency-generator/class/Generator.js'**. Here you can update one large array of strings called nonVersionedDependencies **if package version does not matter** or one large object called versionedDependencies **if you want to keep track of versions**. This allows you to be able to update your dependencies and change the wording of the installation quick and easy.

![pic](https://i.imgur.com/n4rYntY.png)

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

## Demo

run in root of project

Creating pip install script from examples/requirements.txt

`npm run pip`

Creating npm install script from examples/package.json

`npm run npm`

---

## Installation

`npm i --dev bash-script-dependency-generator@latest`

## Use

Run the following command where language is the installation language (Ex. Python would be `pip install`, Linux would use `sudo apt-get install`)

`node node_modules/bash-script-dependency-generator/ INSTALLATION_LANGUAGE FILE`

File argument is optional, if omitted, a script will be attempted to be built from whatever is in the versionedDependencies object or nonVersionedDependencies array

**Python dependencies - Pip**

Run in terminal if hardcoded versionedDependencyObject

`node node_modules/bash-script-dependency-generator/ pip`

Run in terminal if you have the dependency file

`node node_modules/bash-script-dependency-generator/ pip PATH/TO/requirements.txt`

**Debian Linux - APT**

Run in terminal if hardcoded nonVersionedDependency array

`node node_modules/bash-script-dependency-generator/ apt`

**JavaScript/TypeScript - NPM**

Run in terminal

`node node_modules/bash-script-dependency-generator/ npm package.json`

## Tests

![pic](https://i.imgur.com/3PPUpRJ.png)

run tests with jest using

`npm run test`
