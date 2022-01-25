
import * as Generator from './classes/Generator';

export function createScript(language: string, filename: string) {
  if (!language && !filename) {
    if (process.argv.length < 3 ) {
      console.log('Arguments required to create script');
  
      console.log('npm run start -- LANGUAGE FILE');
      console.log('If you have a file to be read ex. npm run start -- pip requirements.txt');
  
      console.log('npm run start -- LANGUAGE');
      console.log('If you have a hardcoded values to be used ex. npm run start -- pip');
      return;
    }

    // Variables below are redeclared for testing purposes
  
    // First CLI argument
    // language of install to be used
    language = language ? language : process.argv[2];
  
    // Second Optional CLI argument
    // If file is given, use filename if not empty string
    filename = filename ? filename : process.argv.length > 3 ? process.argv[3] : '';
  }

  try {
    console.log(`Script Installation language: ${language} - ${filename}`)
    const generator = new Generator.Generator(language, filename);
    return await generator.createScript();
  } catch {
    console.log('error creating script');
  }
  return false;
}

// createScript(process.argv[2], process.argv[3]);
