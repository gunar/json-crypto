# crypto-json

Easy to use abstraction on top of Node's native `crypto` module to safely encrypt and decrypt JSON objects.

## Installation

```
npm install crypto-json
```

## Usage

```js
const cryptoJson = require('crypto-json');

const key = cryptoJson.createKey();

const codec = cryptoJson.createCodec(key);

// encrypt
const ciphertext = codec.encrypt({ message: 'my secret message' })

// decrypt
const secret = codec.decrypt(ciphertext)
// secret === { message: 'my secret message' }
```

NB: You'll probably want to persist the generated key and store it somewhere safe.

## Benefits

- Safe by nature (only uses native `crypto` functions)
- Safer by forcing you to use unique nonces ([see why it matters](https://www.cryptofails.com/post/70059609995/crypto-noobs-1-initialization-vectors))
- Easy to use interface for JSON objects
- Ciphertexts are valid URL query argument strings (using encodeURIComponent)
