import sha256 from "crypto-js/sha256";
import base64url from "./base64url";

function getRandomString(length) {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for ( var i = 0; i < length; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

function generateCodeVerifier() {
  const codeVerifier = getRandomString(32);
  const codeChallenge = sha256(codeVerifier).toString();
  const codeChallengeBase64Url = base64url.encode(codeChallenge)
  return {
    codeVerifier,
    codeChallenge,
    codeChallengeBase64Url,
  };
}

export default generateCodeVerifier;
