
import { Generator } from './classes/Generator';

export async function createScript(language: string = "", filename: string = "") {
  console.log(process.argv)
  if (!language && !filename) {
    if (!process.argv[2]) {
      console.log('Arguments required to create script');
      console.log('npm run start -- LANGUAGE');
      console.log('If you have a hardcoded values to be used ex. npm run start -- pip');
      console.log('npm run start -- DEPENDENCY_FILE');
      console.log('If you have a file to be read ex. npm run start -- pip requirements.txt');
      return;
    }
    // Variables below are redeclared for testing purposes
  
    // First CLI argument
    // language of install to be used
    language = process.argv[2];
  
    // Second Optional CLI argument
    // If file is given, use filename if not empty string
    filename = process.argv[3] ?? ""
  }

  try {
    console.log(`Script Installation language: ${language} - ${filename}`)
    const generator = new Generator(language, filename);
    return await generator.createScript();
  } catch {
    console.log('error creating script');
  }
  return false;
}

function main() {
  if (process.argv[2] !== '--config') {
    createScript();
  }
  return;
}

main();