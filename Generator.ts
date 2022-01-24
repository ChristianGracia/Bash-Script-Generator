const fs = require("fs");

// This is for arrays of package names when version isn't important
// Leave this as empty array unless you want to hardcode each package
const nonVersionedDependencies = [];

// ex. install python3-dev and python3-pip without specific version
// const nonVersionedDependencies = [
//     "python3-dev",
//     "python3-pip",
// ];

// This is for an object with keys equal to package names and values of the package version for when specific version is important
// Leave this as empty object unless you want to hardcode in the package + version
const versionedDependencies = [{}];

// ex. install pip at 20.3.4 and requests as 2.25.1
// const versionedDependencies = {
//     pip: "20.3.4",
//     requests: "2.25.1",
// };

// Edit script installation text here
const scriptLanguage = {
  APT: "sudo apt-get install",
  PYTHON: "pip install",
};

export default class Generator {
  public language: string = '';
  public versioning: boolean = false;

  constructor(language: string, versioning: boolean) {
    this.language = language;
    this.versioning = versioning;
}
  private createVersionedScript = () => {
    const keys = Object.keys(versionedDependencies);
    return keys.reduce(
      (scriptString, dependency, currentIndex) =>
        (scriptString += `${scriptLanguage} ${dependency}==${
          versionedDependencies[dependency]
        }${currentIndex < keys.length - 1 ? " && " : ""}`),
      ""
    )
  }
  private createNonVersionedScript = () : string => {
    return nonVersionedDependencies.reduce(
      (scriptString, dependency, currentIndex) =>
        (scriptString += `${scriptLanguage} ${dependency}${
          currentIndex < nonVersionedDependencies.length - 1 ? " && " : ""
        } `),
      ""
    );
  }
  public createScript = () => {
    if (this.versioning) {
      this.createVersionedScript();
    } else {
      this.createNonVersionedScript();
    }
    this.writeScriptToFile();
  }

  private writeScriptToFile = () => {
    fs.writeFile("install-depedencies.sh", '', (err: any) => {
      if (err) throw err;
      console.log(`${this.versioning ? 'Versioned' : 'Non Versioned'} Script Generated`);
      console.log(
        "Find your script in the generated file install-depedencies.sh"
      );
    });
  }
}