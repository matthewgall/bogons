import ipaddr from 'ipaddr.js';

const ipReverser = (ip, suffix, suffix6) => {
    suffix = suffix ? `.${suffix}` : "";
    suffix6 = suffix6 ? `.${suffix6}` : suffix;

    let parsed;
    try {
        parsed = ipaddr.parse(ip);
    } catch (e) {
        throw new Error(`Invalid IP address: ${ip}`);
    }

    if (parsed instanceof ipaddr.IPv4) {
        return ip.split(".").reverse().join(".") + suffix;
    } else {
        return parsed.toNormalizedString().split(":").map(n => {
            return n.length >= 4 ? n : new Array(4 - n.length + 1).join("0") + n;
        }).join("").split("").reverse().join(".") + suffix6;
    }
};

export default ipReverser;