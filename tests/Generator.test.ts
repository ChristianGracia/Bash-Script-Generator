
import { Generator } from '../classes/Generator';

const mockPackageJson = {
    "name": "example-package-json",
    "dependencies": {
        "jest": "^27.4.7",
        "prettier": "^2.5.1"
    },
    "devDependencies": {
      "@types/jest": "^27.4.0",
      "@types/node": "^17.0.10",
      "jest": "^27.4.7",
      "prettier": "^2.5.1",
      "ts-jest": "^27.1.3",
      "tslint": "^6.1.3",
      "tslint-config-prettier": "^1.18.0",
      "typescript": "^4.5.5"
    }
}


test('Version pip dependencies created correctly', () => {
    const generator = new Generator('pip', '');
    generator.versionedDependencies = [{'test': '2.3.5', "tester": '2.3.4'}]
    generator.createVersionedScript();
    expect(generator.createVersionedScript()).toEqual('pip install test==2.3.5 && pip install tester==2.3.4');
    expect(generator.createNonVersionedScript()).not.toEqual('sudo apt-get install test && sudo apt-get install tester2');
});

test('Non versioned dependencies created correctly', () => {
    const generator = new Generator('apt', '');
    generator.nonVersionedDependencies = ['test', 'tester']
    generator.createNonVersionedScript();
    expect(generator.createNonVersionedScript()).toEqual('sudo apt-get install test && sudo apt-get install tester');
    expect(generator.createNonVersionedScript()).not.toEqual('sudo apt-get install test && sudo apt-get install tester2');
});

test('Version npm dependencies created correctly', () => {
    const generator = new Generator('npm', '');
    generator.versionedDependencies = [{'typescript': "^4.5.5", "ts-jest": "^6.1.3"}, {'@types/jest': "^27.4.0", "@types/node": "^6.1.8"}]
    generator.createVersionedScript();
    expect(generator.createVersionedScript()).toEqual('npm i --save typescript@^4.5.5 ts-jest@^6.1.3 && npm i --dev @types/jest@^27.4.0 @types/node@^6.1.8' );
    expect(generator.createNonVersionedScript()).not.toEqual('npm i --save typescript@^4.5.5 ts-jest@^6.1.3 &&  npm i --dev @types/jest@^27.4.0 @types/node@^6.1.8');
});