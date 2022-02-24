import { Buffer } from 'buffer'

function toBase64(base64url) {
  base64url = base64url.toString();
  return padString(base64url)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
}

function encode(input, encoding) {
  if (encoding === void 0) { encoding = "utf8"; }
  if (Buffer.isBuffer(input)) {
      return fromBase64(input.toString("base64"));
  }
  return fromBase64(Buffer.from(input, encoding).toString("base64"));
}

function fromBase64(base64) {
  return base64
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
}
function toBuffer(base64url) {
  return Buffer.from(toBase64(base64url), "base64");
}

function padString(input) {
    var segmentLength = 4;
    var stringLength = input.length;
    var diff = stringLength % segmentLength;
    if (!diff) {
        return input;
    }
    var position = stringLength;
    var padLength = segmentLength - diff;
    var paddedStringLength = stringLength + padLength;
    var buffer = Buffer.alloc(paddedStringLength);
    buffer.write(input);
    while (padLength--) {
        buffer.write("=", position++);
    }
    return buffer.toString();
}

export default {
    encode,
    padString
}