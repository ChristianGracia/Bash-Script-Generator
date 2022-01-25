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
const versionedDependencies = { pip: "1.1.0" };

// ex. install pip at 20.3.4 and requests as 2.25.1
// const versionedDependencies = {
//     pip: "20.3.4",
//     requests: "2.25.1",
// };

// -----------------------------------------------------------------------------------------------------------------------------------------------

// Edit script installation text here
const fileLanguage = {
  APT: "sudo apt-get install",
  'requirements.txt': "pip install",
};

class Generator {
  private file: string = "";
  private script: string = "";

  constructor(file: string) {
    this.file = file;
  }

  private createVersionedScript = () => {
    const keys = Object.keys(versionedDependencies);
    return keys.reduce(
      (scriptString, dependency, currentIndex) =>
        (scriptString += `${fileLanguage[this.file]} ${dependency}==${
          versionedDependencies[dependency]
        }${currentIndex < keys.length - 1 ? " && " : ""}`),
      ""
    )
  }
  private createNonVersionedScript = () : string => {
    return nonVersionedDependencies.reduce(
      (scriptString, dependency, currentIndex) =>
        (scriptString += `${fileLanguage[this.file]} ${dependency}${
          currentIndex < nonVersionedDependencies.length - 1 ? " && " : ""
        } `),
      ""
    );
  }
  public createScript = () => {

    if (this.file) {
      console.log('File found');

    } else {
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
    }
    this.writeScriptToFile(this.script);
  }

  private writeScriptToFile = (script: string) => {
    fs.writeFile("install-depedencies.sh", script, (err: any) => {
      if (err) throw err;
      console.log(
        "Find your script in the generated file install-depedencies.sh"
      );
    });
  }
}

function createScript() {
  console.log(process.argv)

  // First CLI argument 
  // If file is given, use filename if not empty string
  const file = process.argv.length > 2 ? process.argv[2] : ""

  try {
    let generator = new Generator(file);
    generator.createScript();
  } catch { console.log('error creating script')}

  fs.unlinkSync('index.js');
}
createScript();