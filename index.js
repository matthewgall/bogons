import isIP from 'validator/lib/isIP.js';
import cidrMatcher from 'cidr-matcher';
import BogonData from './data.js';

class InvalidIP extends Error {}
export default class Bogon {
    constructor(addr) {
        this.address = addr;
        this.type = this.address.includes(':') ? 'v6' : 'v4'
        this.bogons = new BogonData().data;
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
}

export { Bogon }