import fs from 'fs';

// This is for arrays of package names when version isn't important
// Leave this as empty array unless you want to hardcode each package
// Generator Property nonVersionedDependencies = [];

// ex. install python3-dev and python3-pip without specific version
// const nonVersionedDependencies = [
//     "python3-dev",
//     "python3-pip",
// ];

// -----------------------------------------------------------------------------------------------------------------------------------------------

// This is for an object with keys equal to package names and values of the package version for when specific version is important
// Leave this as empty object unless you want to hardcode in the package + version
// Second index object is only for package.json dev dependencies at this momemnt

// Generator Property versionedDependencies = [{}];

// ex. install pip at 20.3.4 and requests as 2.25.1
// const versionedDependencies = {
//     pip: "20.3.4",
//     requests: "2.25.1",
// };

// -----------------------------------------------------------------------------------------------------------------------------------------------

// Edit script installation text here
const fileLanguages = {
  apt: 'sudo apt-get install',
  pip: 'pip install',
  npm: 'npm install'
};

export class Generator {
  private file: string = '';
  private script: string = '';
  private language: string = '';

  // This is for arrays of package names when version isn't important
  // Leave this as empty array unless you want to hardcode each package 

  public nonVersionedDependencies : string[] = [];

  // ex. install python3-dev and python3-pip without specific version
  // const nonVersionedDependencies = [
  //     "python3-dev",
  //     "python3-pip",
  // ];

  public versionedDependencies : any = [{}];

  constructor(language: string, file: string) {
    (this.language = language), (this.file = file);
  }

  public createVersionedScript = () => {
    const keys = Object.keys(this.versionedDependencies.length && typeof this.versionedDependencies[0] === 'object' ? this.versionedDependencies[0] : {});
    const length = keys.length

    if (this.language === 'npm') {
      const devKeys = Object.keys(this.versionedDependencies.length === 2 && typeof this.versionedDependencies[1] === 'object' ? this.versionedDependencies[1] : {});
      let scriptString = "";
      keys.forEach((key: string, currentIndex: number) => {
        if (currentIndex === 0) {
          scriptString += 'npm i --save '
        }
        scriptString += `${key}@${this.versionedDependencies[0][key]}${currentIndex === keys.length - 1 ? '' : ' '}`
      });
      devKeys.forEach((key: string, currentIndex: number) => {
        if (currentIndex === 0) {
          scriptString += `${scriptString === '' ? '' : ' && '}npm i --dev `
        }
        scriptString += `${key}@${this.versionedDependencies[1][key]}${currentIndex === devKeys.length - 1 ? '' : ' '}`
      });
      return scriptString;
    } else {
      return keys.reduce(
        (scriptString, dependency, currentIndex) =>
          (scriptString += `${fileLanguages[this.language]} ${dependency}==${this.versionedDependencies[0][dependency]}${
            currentIndex < length - 1 ? ' && ' : ''
          }`),
        '',
      );
    }
  };
  public createNonVersionedScript = (): string => {
    const length = this.nonVersionedDependencies.length;
    return this.nonVersionedDependencies.reduce(
      (scriptString, dependency, currentIndex) =>
        (scriptString += `${fileLanguages[this.language]} ${dependency}${
          currentIndex < length - 1 ? ' && ' : ''
        }`),
      '',
    );
  };
  private createScriptFromFile = async () => {
    console.log(
      `-------------------------------------------------- Reading File - ${this.file} ------------------------------------------------------`,
    );
    return await fs.readFile(this.file, 'utf8', async (err, data) => {
      console.log(data)
      if (data) {
        switch(this.language) {
          case 'pip': 
            const parsedData = data.split('\n').map((item) => item.replace(/[\r]/g, ''));
            parsedData.forEach((item) => {
              const splitItem = item.split('==');
              this.versionedDependencies[splitItem[0]] = splitItem[1];
            });
          break;
          case 'npm': ;
            const { devDependencies, dependencies } = JSON.parse(data);
            Object.keys(dependencies).forEach((dependency) => {
              this.versionedDependencies[0][dependency] = dependencies[dependency];
            });

            const devDependencyObj = {};
            Object.keys(devDependencies).forEach((dependency) => {
              devDependencyObj[dependency] = devDependencies[dependency];
            });
            this.versionedDependencies.push(devDependencyObj);
            break;
          default:
            break;
        }
        return await this.writeScriptToFile(this.createVersionedScript());
      } else {
        console.log(
          `-------------------------------------------------- Error Reading File - ${this.file} ------------------------------------------------------`,
        );
      }
    });
  };

  public createScript = async () => {
    if (!Object.keys(fileLanguages).includes(this.language)) {
      console.log('Incorrect or unsupported installation language set');
      return;
    }
    if (this.file) {
      return await this.createScriptFromFile();
    } else {
      return this.attemptScriptFromHardcodedValues();
    }
  };
  public attemptScriptFromHardcodedValues = () => {
    console.log('No File given as argument, checking hardcoded values');

    const hardCodedVersionedDependencies = Object.keys(this.versionedDependencies).length;
    const hardCodedNonVersionedDependencies = this.nonVersionedDependencies.length;

    // Cannot currently process both at once
    if (hardCodedVersionedDependencies && hardCodedNonVersionedDependencies) {
      console.log(
        'Cannot parse both versioned object and non versioned dependencies at the same time currently, this will be implemented later',
      );
      return;
    }

    if (!hardCodedVersionedDependencies && !hardCodedNonVersionedDependencies) {
      console.log('No hardcoded dependencies or file given as an argument to create script');
      return;
    }

    if (hardCodedVersionedDependencies) {
      console.log('creating versioned dependencies script');
      this.script = this.createVersionedScript();
    } else if (hardCodedNonVersionedDependencies) {
      console.log('creating non versioned dependencies script');
      this.script = this.createNonVersionedScript();
    }
    return this.writeScriptToFile(this.script);
  };

  private writeScriptToFile = async (script: string) => {
    console.log(this.script);
    return await fs.writeFile('install-depedencies.sh', script, (err: any) => {
      if (err) throw err;
      console.log(
        '-------------------------------------------------- Script Created - Find your script in the generated file install-depedencies.sh -----------------------------------------------------------------------------',
      );
      return true;
    });

  };
}