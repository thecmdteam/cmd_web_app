const crypto = require("crypto");

/* function getRandomString(length) {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for ( var i = 0; i < length; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}
 */
function getKeys() {
  const code_verifier = crypto.randomBytes(32).toString("base64");
  const code_challenge = crypto
    .createHash("sha256")
    .update(code_verifier)
    .digest("base64url");
  return {
      code_verifier,
      code_challenge,
  }
}
