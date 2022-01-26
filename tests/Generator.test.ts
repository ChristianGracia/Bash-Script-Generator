
import { Generator } from '../classes/Generator';

test('Version dependencies created correctly', () => {
    const generator = new Generator('pip', '');
    generator.versionedDependencies = {'test': '2.3.5', "tester": '2.3.4'}
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