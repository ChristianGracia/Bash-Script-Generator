const fs = require("fs");

// This is for arrays of package names when version isn't important
// Leave this as empty array unless you want to hardcode each package
const nonVersionedDependencies = [];

// ex. install python3-dev and python3-pip without specific version
// const nonVersionedDependencies = [
//     "python3-dev",
//     "python3-pip",
// ];

// -----------------------------------------------------------------------------------------------------------------------------------------------

// This is for an object with keys equal to package names and values of the package version for when specific version is important
// Leave this as empty object unless you want to hardcode in the package + version
const versionedDependencies = {};

// ex. install pip at 20.3.4 and requests as 2.25.1
// const versionedDependencies = {
//     pip: "20.3.4",
//     requests: "2.25.1",
// };

// -----------------------------------------------------------------------------------------------------------------------------------------------

// Edit script installation text here
const fileLanguages = {
  apt: "sudo apt-get install",
  pip: "pip install",
};

class Generator {
  private file: string = "";
  private script: string = "";
  private language: string = "";

  constructor(language: string, file: string) {
    this.language = language,
    this.file = file;
  }

  private createVersionedScript = () => {
    const keys = Object.keys(versionedDependencies);
    return keys.reduce(
      (scriptString, dependency, currentIndex) =>
        (scriptString += `${fileLanguages[this.language]} ${dependency}==${versionedDependencies[dependency]}${currentIndex < keys.length - 1 ? " && " : ""}`),
      ""
    )
  }
  private createNonVersionedScript = () : string => {
    return nonVersionedDependencies.reduce(
      (scriptString, dependency, currentIndex) =>
        (scriptString += `${fileLanguages[this.language]} ${dependency}${
          currentIndex < nonVersionedDependencies.length - 1 ? " && " : ""
        }`),
      ""
    );
  }
  private createScriptFromFile = () => {
    console.log(`-------------------------------------------------- Reading File - ${this.file} ------------------------------------------------------`);
    fs.readFile(this.file, 'utf8', (err, data) => {
      const parsedData = data.split("\n").map((item) => item.replace(/[\r]/g, ""));
      parsedData.forEach((item) => {
        const splitItem = item.split("==");
        versionedDependencies[splitItem[0]] = splitItem[1];
      });
      this.script = this.createVersionedScript();
      this.writeScriptToFile(this.script);
    });
  }

  public createScript = () => {
    if (!Object.keys(fileLanguages).includes(this.language)) {
      console.log('Incorrect or unsupported installation language set')
      return;
    }
    if (this.file) {
      this.createScriptFromFile();
    } else {
      this.attemptScriptFromHardcodedValues();
    }
  }
  private attemptScriptFromHardcodedValues = () => {
    console.log('No File given as argument, checking hardcoded values');

    const hardCodedVersionedDependencies = Object.keys(versionedDependencies).length;
    const hardCodedNonVersionedDependencies = nonVersionedDependencies.length;

    // Cannot currently process both at once
    if (hardCodedVersionedDependencies && hardCodedNonVersionedDependencies) {
      console.log('Cannot parse both versioned object and non versioned dependencies at the same time currently, this will be implemented later');
      return;
    }

    if (!hardCodedVersionedDependencies && !hardCodedNonVersionedDependencies) {
      console.log('No hardcoded dependencies or file given as an argument to create script');
      return;
    }

    if (hardCodedVersionedDependencies) {
      console.log('creating versioned dependencies script')
      this.script = this.createVersionedScript();
    }
    else if (hardCodedNonVersionedDependencies) {
      console.log('creating non versioned dependencies script')
      this.script = this.createNonVersionedScript();
    }
    this.writeScriptToFile(this.script);
  }

  private writeScriptToFile = (script: string) => {
    fs.writeFile("install-depedencies.sh", script, (err: any) => {
      if (err) throw err;
      console.log('-------------------------------------------------- Script Created -----------------------------------------------------------------------------');
      console.log(this.script);
      console.log(
        "Find your script in the generated file install-depedencies.sh"
      );
    });
  }
}

function createScript() {
  if (process.argv.length < 3) {
    console.log('Arguments required to create script')

    console.log('npm run start -- LANGUAGE FILE')
    console.log('If you have a file to be read ex. npm run start -- pip requirements.txt')

    console.log('npm run start -- LANGUAGE')
    console.log('If you have a hardcoded values to be used ex. npm run start -- pip')
    return;
  }

  // First CLI argument 
  // language of install to be used
  const language = process.argv[2];

  // Second Optional CLI argument 
  // If file is given, use filename if not empty string
  const file = process.argv.length > 3 ? process.argv[3] : "";
  try {
    let generator = new Generator(language, file);
    generator.createScript();
  } catch { console.log('error creating script')}
}

createScript();