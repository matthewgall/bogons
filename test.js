import test from 'ava';
import Bogon from './index.js'

let tests = {
    'bogon': [
        '192.168.1.1',
        '10.0.0.1',
        '0100::'
    ],
    'not_bogon': [
        '172.66.40.145',
        '172.66.43.111',
        '2606:4700:3108::ac42:2891',
        '2606:4700:3108::ac42:2b6f'
    ],
    'invalid': [
        'lol',
        'fail'
    ]
}

test('all bogon addresses are detected', t => {
	for (let i of tests['bogon']) {
        try {
            let b = new Bogon(i)
            if (!b.isBogon()) {
                throw Error
            }
        }
        catch(e) {
            t.fail(`${i} was detected as Bogon`);
        }
    }
    t.pass();
});

test('all non-bogon addresses are detected', t => {
	for (let i of tests['not_bogon']) {
        try {
            let b = new Bogon(i)
            if (b.isBogon()) {
                throw Error
            }
        }
        catch(e) {
            t.fail(`${i} was detected as Bogon`);
        }
    }
    t.pass();
});