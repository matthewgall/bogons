# @matthewgall/bogon

Detect bogon addresses in IPv4 and IPv6 ranges, quickly and easily.

## What is a Bogon?

From [ipinfo.io](https://ipinfo.io/bogon):

    Some IP addresses and IP ranges are reserved for special use, such as for local or private networks, and should not appear on the public internet. These reserved ranges, along with other IP ranges that haven't yet been allocated and therefore also shouldn't appear on the public internet are sometimes known as bogons.

## Installation

```sh
npm install --save @matthewgall/bogon
```

## Usage

```javascript
import { Bogon } from "@matthewgall/bogon";

let bogon = new Bogon('{IP ADDRESS}')
return bogon.isBogon()

```

`Bogon` takes a single parameter:

1. The IPv4 or IPv6 address you want to check

When you're ready to check, call the isBogon() function. This will return a Boolean result:

- true: The address is a bogon, it should not exist on the public internet or is reserved;
- false: The address is not a bogon;
