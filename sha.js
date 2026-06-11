// Shared SHA-256 helper for the escape game.
// Answers are never stored in plaintext in the page source — only their
// SHA-256 hex digest. The player's input is hashed and compared to the digest,
// so View-Source no longer reveals the solution.
//
// crypto.subtle is available in secure contexts: https://, localhost, and
// file:// (browsers treat local files as a secure context). GitHub Pages is
// https, so this works in all target environments.
async function sha256(str) {
  const data = new TextEncoder().encode(str);
  const buf  = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}
