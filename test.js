import test from 'ava';
import Bogon from './index.js'

let tests = {
    'bogon': [
        '0.0.0.0',
        '10.0.0.1',
        '100.64.1.0',
        '127.0.0.1',
        '127.0.53.53',
        '169.254.0.1',
        '172.16.1.0',
        '192.168.1.1',
        '192.0.2.1',
        '0100::',
        '100::',
        '::'
    ],
    'not_bogon': [
        // 1.1.1.1
        '1.1.1.1',
        '1.0.0.1',
        '2606:4700:4700::1111',
        '2606:4700:4700::1001',
        // 8.8.8.8
        '8.8.8.8',
        '8.8.4.4',
        '2001:4860:4860::8888',
        '2001:4860:4860::8844',
        // Quad9
        '9.9.9.9',
        '149.112.112.112',
        '2620:fe::fe',
        '2620:fe::9',
        // OpenDNS
        '208.67.222.222',
        '208.67.220.220',
        '2620:119:35::35',
        '2620:119:53::53',
        // Cloudflare
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