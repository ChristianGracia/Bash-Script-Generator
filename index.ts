import Generator from "./Generator";

function createScript() {
    const language = process.argv[2];
    const versioning = process.argv[3];
  
    if (language) {
      console.log(`Language selected: ${language}`);
    }
    if (versioning) {
      console.log(`Versioning selected: ${versioning}`);
    }
  
    let generator = new Generator(language, versioning === 'true');
    generator.createScript();
}
createScript();