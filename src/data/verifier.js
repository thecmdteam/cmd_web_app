import pkceChallenge from "pkce-challenge";

function getKeys() {
  return pkceChallenge(45)
}

export default getKeys;
