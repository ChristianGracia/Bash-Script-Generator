import { createScript } from '../index';
import fs from 'fs';

test('Create requirements.txt from file success', async () => {
    await createScript('pip', 'examples/requirements.txt').then(value => {
        console.log('val ' + value);
        expect(fs.readFileSync('install-depedencies.sh').toString()).toEqual('pip install cycler==0.10.0 && pip install pandas==1.0.4 && pip install kiwisolver==1.2.0 && pip install pyparsing==2.4.7 && pip install python-dateutil==2.8.1 && pip install pytz==2020.1 && pip install six==1.15.0 && pip install scipy==1.4.1 && pip install matplotlib==3.2.1 && pip install numpy==1.18.5 && pip install seaborn==0.10.1');
    })
})

test('Create requirements.txt from file fails correctly', async () => {
    expect(fs.readFileSync('install-depedencies.sh').toString()).not.toEqual('!pip install cycler==0.10.0 && pip install pandas==1.0.4 && pip install kiwisolver==1.2.0 && pip install pyparsing==2.4.7 && pip install python-dateutil==2.8.1 && pip install pytz==2020.1 && pip install six==1.15.0 && pip install scipy==1.4.1 && pip install matplotlib==3.2.1 && pip install numpy==1.18.5 && pip install seaborn==0.10.1');
    // fs.unlink('install-depedencies.sh' ,(err) => {
    //     if (err) throw err;
    //     console.log('install-depedencies.sh was deleted');
    // });
})

test('No dependency installation language creates error', async () => {
    expect(await createScript("", "d")).not.toBeTruthy;
})

test('Unsupported installation language creates error', async () => {
    expect(await createScript("c#", "depedency.xml")).not.toBeTruthy;
})