const assert = require("assert");

const fc = require("fast-check");

const { createKey, createCodec } = require("./");

describe("createKey", () => {
  it("returns a string", () => {
    const actual = createKey();
    assert.equal(typeof actual, "string");
  });
});

describe("createCodec", () => {
  it("returns an object with expected properties", () => {
    const actual = createCodec(createKey());
    assert.deepEqual(Object.keys(actual), ["encrypt", "decrypt"]);
  });

  describe("encrypt/decrypt", () => {
    it("is a bijection", () => {
      fc.assert(
        fc.property(fc.jsonObject(), (object) => {
          const codec = createCodec(createKey());
          const ciphertext = codec.encrypt(object);
          assert.deepStrictEqual(codec.decrypt(ciphertext), object);
        })
      );
    });

    it("uses unique nonces", () => {
      const nonces = [];
      fc.assert(
        fc.property(fc.jsonObject(), (object) => {
          const codec = createCodec(createKey());
          const ciphertext = codec.encrypt(object);
          const [nonce] = JSON.parse(decodeURIComponent(ciphertext));
          assert(!nonces.includes(nonce));
          nonces.push(nonce);
        })
      );
    });
  });
});
