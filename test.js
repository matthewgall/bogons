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
    'extended_bogon': [
        // https://www.team-cymru.org/Services/Bogons/fullbogons-ipv4.txt
        '10.0.1.1',
	'192.168.4.1',
        // https://www.team-cymru.org/Services/Bogons/fullbogons-ipv6.txt
        '2001:222::101',
        '2406:c9c2::65',
        '4000::'
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
        'fail',
        '256.1.1.1',
        'za01::'
    ]
}

/**
 * OFFLINE TESTS
 */

for (let i of tests['bogon']) {
    test(`${i} was detected as a Bogon address (offline)`, t => {
        try {
            let b = new Bogon(i)
            if (!b.isBogon()) {
                throw Error
            }
        }
        catch(e) {
            t.fail(`${i} was detected as Bogon`);
        }
        t.pass();
    });
}

for (let i of tests['not_bogon']) {
    test(`${i} was identified as a non-Bogon address (offline)`, t => {
        try {
            let b = new Bogon(i)
            if (b.isBogon()) {
                throw Error
            }
        }
        catch(e) {
            t.fail(`${i} was detected as Bogon`);
        }
        t.pass();
    });
}

for (let i of tests['invalid']) {
    test(`${i} was identified as an invalid IP address (offline)`, t => {
        try {
            let b = new Bogon(i)
            if (b.isBogon()) {
                throw Error
            }
            t.fail(`${i} was accepted as a valid IP address`)
        }
        catch(e) {}
        t.pass();
    });
}

/**
 * ONLINE TESTS
 */
 for (let i of tests['bogon']) {
    test(`${i} was detected as a Bogon address (online)`, async t => {
        try {
            let b = new Bogon(i);
            b = await b.isExtendedBogon();
            if (!b) {
                throw Error
            }
        }
        catch(e) {
            console.log(e);
            t.fail(`${i} was detected as Bogon`);
        }
        t.pass();
    });
}

for (let i of tests['extended_bogon']) {
    test(`${i} was detected as a Bogon address (online)`, async t => {
        try {
            let b = new Bogon(i);
            b = await b.isExtendedBogon();
            if (!b) {
                throw Error
            }
        }
        catch(e) {
            console.log(e);
            t.fail(`${i} was detected as Bogon`);
        }
        t.pass();
    });
}

for (let i of tests['not_bogon']) {
    test(`${i} was identified as a non-Bogon address (online)`, async t => {
        try {
            let b = new Bogon(i);
            b = await b.isExtendedBogon();
            if (b) {
                throw Error
            }
        }
        catch(e) {
            t.fail(`${i} was detected as Bogon`);
        }
        t.pass();
    });
}

for (let i of tests['invalid']) {
    test(`${i} was identified as an invalid IP address (online)`, async t => {
        try {
            let b = new Bogon(i);
            b = await b.isExtendedBogon();
            if (b) {
                throw Error
            }
            t.fail(`${i} was accepted as a valid IP address`)
        }
        catch(e) {}
        t.pass();
    });
}
