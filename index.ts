function createScript() {
    const language = process.argv[2];
    const versioning = process.argv[3];
  
    if (language) {
      console.log(`Language selected: ${language}`);
    }
    if (versioning) {
      console.log(`Versioning selected: ${versioning}`);
    }
  
    let script = createAptScript() + createPipScript();
    console.log(script);
    const fs = require("fs");
    fs.writeFile("install-depedencies.sh", script, (err) => {
      if (err) throw err;
      console.log("Script Generated");
      console.log(
        "Find your script in the generated file install-depedencies.sh"
      );
    });
  }