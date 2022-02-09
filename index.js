import {IPv4CidrRange, IPv6CidrRange} from "ip-num/IPRange.js";
import {Validator} from "ip-num/Validator.js";

class InvalidIP extends Error {}
class Bogon {
	constructor(addr) {
        this.address = addr;
        this.bogons = {
            'ipv4': [
                '0.0.0.0/8',
                '10.0.0.0/8',
                '100.64.0.0/10',
                '127.0.0.0/8',
                '169.254.0.0/16',
                '172.16.0.0/12',
                '192.0.0.0/24',
                '192.0.2.0/24',
                '192.168.0.0/16',
                '198.18.0.0/15',
                '198.51.100.0/24',
                '203.0.113.0/24',
                '224.0.0.0/3',
            ],
            'ipv6': [
                '::/128',
                '::1/128',
                '::ffff:0:0/96',
                '::/96',
                '100::/64',
                '2001:10::/28',
                '2001:db8::/32',
                'fc00::/7',
                'fe80::/10',
                'fec0::/10',
                'ff00::/8',
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
        };
	}

    isBogon() {
        try {
            if (Validator.isValidIPv4String(this.address)) {
                for (let r of this.bogons['ipv4']) {
                    let parentRange = IPv4CidrRange.fromCidr(r);
                    let childRange = IPv4CidrRange.fromCidr(`${this.address}/32`);
                    if (childRange.inside(parentRange)) {
                        return true;
                    }
                }
                return false;
            }
        }
        catch(e) {
            try {
                if (Validator.isValidIPv6String(this.address)) {
                    for (let r of this.bogons['ipv6']) {
                        let parentRange = IPv6CidrRange.fromCidr(r);
                        let childRange = IPv6CidrRange.fromCidr(`${this.address}/128`);
                        if (childRange.inside(parentRange)) {
                            return true;
                        }
                    }
                    return false;
                }
            }
            catch(e) {
                throw new InvalidIP(`${this.address} is not a valid IPv4/IPv6 address`);
            }
        }
    }
}

export default Bogon