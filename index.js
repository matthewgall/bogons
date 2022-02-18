import isIP from 'validator/lib/isIP.js';
import cidrMatcher from 'cidr-matcher';
import BogonData from './data.js';
import ipReverser from './reverser.js';
import axios from 'axios';

class InvalidIP extends Error {}
export default class Bogon {
    constructor(addr, online = false) {
        this.address = addr;
        this.type = this.address.includes(':') ? 'v6' : 'v4'
        this.bogons = new BogonData().data;

        this.resolvers = [
			'https://dns.google.com/resolve',
			'https://cloudflare-dns.com/dns-query'
		]
		this.resolverBase = this.resolvers[Math.floor(Math.random() * this.resolvers.length)]
    }

    isBogon() {
        if (!isIP(this.address)) {
            throw new InvalidIP(`${this.address} is not a valid IPv4/IPv6 address`);
        }
        if (this.type == 'v6') {
            for (let cls of ['ipv6', 'ipv6_additional']) {
                for (let r of this.bogons[cls]) {
                    let matcher = new cidrMatcher(this.bogons[cls]);
                    return matcher.contains(this.address);
                }
            }
        }
        if (this.type == 'v4') {
            let matcher = new cidrMatcher(this.bogons['ipv4']);
            return matcher.contains(this.address);
        }
    }

    async isExtendedBogon() {
        if (!isIP(this.address)) {
            throw new InvalidIP(`${this.address} is not a valid IPv4/IPv6 address`);
        }
        let reversed = ipReverser(this.address, "ipv4", "ipv6").replaceAll('.ipv', '.v');

        // Now to make a request
        let d = await axios.get(`${this.resolverBase}?name=${reversed}.fullbogons.cymru.com&type=TXT`, {
            'headers': {
                'Accept': 'application/dns-json'
            },
            'responseType': 'json'
        });

        try {
            return d.data['Answer'][0]['data'].split(',').length > 0;
        }
        catch(e) {
            return false;
        }
        
    }
}

export {
    Bogon
}
