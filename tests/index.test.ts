import { createScript } from '../index';
import fs from 'fs';

test('Receive value of true from success', async (done) => {
    await createScript('pip', 'examples/requirements.txt').then(value => {
        console.log('val ' + value);
        setTimeout(() => expect(value).toBeTruthy(), 5000);
        // expect(fs.readFileSync('install-depedencies.sh').toString()).toEqual('pip install cycler==0.10.0 && pip install pandas==1.0.4 && pip install kiwisolver==1.2.0 && pip install pyparsing==2.4.7 && pip install python-dateutil==2.8.1 && pip install pytz==2020.1 && pip install six==1.15.0 && pip install scipy==1.4.1 && pip install matplotlib==3.2.1 && pip install numpy==1.18.5 && pip install seaborn==0.10.1')
        done();
    })
})

// let app = null;
// beforeAll(async () => {
//     app = addAsync(await createScript('pip', 'examples/requirements.txt'));
// });

// it('Receive value of true from success', () => {
//     expect(app).toBeTruthy();
// });

    // console.log('1 dine;')
    // await expect(fs.readFileSync('../install-depedencies.sh').toString()).toEqual('pip install cycler==0.10.0 && pip install pandas==1.0.4 && pip install kiwisolver==1.2.0 && pip install pyparsing==2.4.7 && pip install python-dateutil==2.8.1 && pip install pytz==2020.1 && pip install six==1.15.0 && pip install scipy==1.4.1 && pip install matplotlib==3.2.1 && pip install numpy==1.18.5 && pip install seaborn==0.10.1');
    // console.log('2 dine;')


// test("incorrect language", async () => {
//     await createScript('pip', 'examples/requirements.txt');
//     expect(fs.readFileSync('install-depedencies.sh').toString()).toEqual('pip install cycler==0.10.0 && pip install pandas==1.0.4 && pip install kiwisolver==1.2.0 && pip install pyparsing==2.4.7 && pip install python-dateutil==2.8.1 && pip install pytz==2020.1 && pip install six==1.15.0 && pip install scipy==1.4.1 && pip install matplotlib==3.2.1 && pip install numpy==1.18.5 && pip install seaborn==0.10.1');
//     expect(createScript('pip', 'examples/requirements.txt')).toEqual(true);
// });

// Generator.test.ts