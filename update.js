import fs from "fs";
import axios from "axios";

let output = {
    'ipv4': [],
    'ipv6': [],
    'ipv6_additional': [
        '2002::/24',
        '2002:a00::/24',
        '2002:7f00::/24',
        '2002:a9fe::/32',
        '2002:ac10::/28',
        '2002:c000::/40',
        '2002:c000:200::/40',
        '2002:c0a8::/32',
        '2002:c612::/31',
        '2002:c633:6400::/40',
        '2002:cb00:7100::/40',
        '2002:e000::/20',
        '2002:f000::/20',
        '2002:ffff:ffff::/48',
        '2001::/40',
        '2001:0:a00::/40',
        '2001:0:7f00::/40',
        '2001:0:a9fe::/48',
        '2001:0:ac10::/44',
        '2001:0:c000::/56',
        '2001:0:c000:200::/56',
        '2001:0:c0a8::/48',
        '2001:0:c612::/47',
        '2001:0:c633:6400::/56',
        '2001:0:cb00:7100::/56',
        '2001:0:e000::/36',
        '2001:0:f000::/36',
        '2001:0:ffff:ffff::/64'
    ]
}
let lists = {
    'ipv4': 'https://www.team-cymru.org/Services/Bogons/fullbogons-ipv4.txt',
    'ipv6': 'https://www.team-cymru.org/Services/Bogons/fullbogons-ipv6.txt'
}

for (let l of Object.keys(lists)) {
    let d = await axios.get(lists[l], {
        'responseType': 'text'
    });
    for (let line of d.data.split('\n')) {
        if (!line.startsWith('#') && line !== "") {
            output[l].push(line.trim())
        }
    }
}

// And write the file
let file = [
    "export default class BogonData {",
    "    constructor() {",
    `        this.data = ${JSON.stringify(output, null, 2)};`,
    "    }",
    "}",
    "export { BogonData }"
]

fs.writeFile('./data.js', file.join("\n"), function (err) {
    if (err) return console.log(err);
    console.log('Successfully wrote to data.js');
});