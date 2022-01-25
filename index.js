var fs = require("fs");
// This is for arrays of package names when version isn't important
// Leave this as empty array unless you want to hardcode each package
var nonVersionedDependencies = [];
// ex. install python3-dev and python3-pip without specific version
// const nonVersionedDependencies = [
//     "python3-dev",
//     "python3-pip",
// ];
// -----------------------------------------------------------------------------------------------------------------------------------------------
// This is for an object with keys equal to package names and values of the package version for when specific version is important
// Leave this as empty object unless you want to hardcode in the package + version
var versionedDependencies = {};
// ex. install pip at 20.3.4 and requests as 2.25.1
// const versionedDependencies = {
//     pip: "20.3.4",
//     requests: "2.25.1",
// };
// -----------------------------------------------------------------------------------------------------------------------------------------------
// Edit script installation text here
var fileLanguages = {
    apt: "sudo apt-get install",
    pip: "pip install",
};
var Generator = /** @class */ (function () {
    function Generator(language, file) {
        var _this = this;
        this.file = "";
        this.script = "";
        this.language = "";
        this.createVersionedScript = function () {
            var keys = Object.keys(versionedDependencies);
            return keys.reduce(function (scriptString, dependency, currentIndex) {
                return (scriptString += "".concat(fileLanguages[_this.language], " ").concat(dependency, "==").concat(versionedDependencies[dependency]).concat(currentIndex < keys.length - 1 ? " && " : ""));
            }, "");
        };
        this.createNonVersionedScript = function () {
            return nonVersionedDependencies.reduce(function (scriptString, dependency, currentIndex) {
                return (scriptString += "".concat(fileLanguages[_this.language], " ").concat(dependency).concat(currentIndex < nonVersionedDependencies.length - 1 ? " && " : ""));
            }, "");
        };
        this.createScriptFromFile = function () {
            console.log("-------------------------------------------------- Reading File - ".concat(_this.file, " ------------------------------------------------------"));
            fs.readFile(_this.file, 'utf8', function (err, data) {
                var parsedData = data.split("\n").map(function (item) { return item.replace(/[\r]/g, ""); });
                parsedData.forEach(function (item) {
                    var splitItem = item.split("==");
                    versionedDependencies[splitItem[0]] = splitItem[1];
                });
                _this.script = _this.createVersionedScript();
                _this.writeScriptToFile(_this.script);
            });
        };
        this.createScript = function () {
            if (!Object.keys(fileLanguages).includes(_this.language)) {
                console.log('Incorrect or unsupported installation language set');
                return;
            }
            if (_this.file) {
                _this.createScriptFromFile();
            }
            else {
                _this.attemptScriptFromHardcodedValues();
            }
        };
        this.attemptScriptFromHardcodedValues = function () {
            console.log('No File given as argument, checking hardcoded values');
            var hardCodedVersionedDependencies = Object.keys(versionedDependencies).length;
            var hardCodedNonVersionedDependencies = nonVersionedDependencies.length;
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
                console.log('creating versioned dependencies script');
                _this.script = _this.createVersionedScript();
            }
            else if (hardCodedNonVersionedDependencies) {
                console.log('creating non versioned dependencies script');
                _this.script = _this.createNonVersionedScript();
            }
            _this.writeScriptToFile(_this.script);
        };
        this.writeScriptToFile = function (script) {
            fs.writeFile("install-depedencies.sh", script, function (err) {
                if (err)
                    throw err;
                console.log('-------------------------------------------------- Script Created -----------------------------------------------------------------');
                console.log(_this.script);
                console.log("Find your script in the generated file install-depedencies.sh");
            });
        };
        this.language = language,
            this.file = file;
    }
    return Generator;
}());
function createScript() {
    if (process.argv.length < 3) {
        console.log('Arguments required to create script');
        console.log('npm run start -- LANGUAGE FILE');
        console.log('If you have a file to be read ex. npm run start -- pip requirements.txt');
        console.log('npm run start -- LANGUAGE');
        console.log('If you have a hardcoded values to be used ex. npm run start -- pip');
        return;
    }
    // First CLI argument 
    // language of install to be used
    var language = process.argv[2];
    // Second Optional CLI argument 
    // If file is given, use filename if not empty string
    var file = process.argv.length > 3 ? process.argv[3] : "";
    try {
        var generator = new Generator(language, file);
        generator.createScript();
    }
    catch (_a) {
        console.log('error creating script');
    }
}
createScript();
