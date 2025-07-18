const encoder = new TextEncoder();
const decoder = new TextDecoder();
const secret = process.env.SESSION_SECRET || "default_secret_key_32bytes!"; // Must be 32 bytes for AES-256

async function getKey() {
  return await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encrypt(text: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getKey();
  const encoded = encoder.encode(text);
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded
  );
  // Combine IV and ciphertext, then base64 encode
  const combined = new Uint8Array(iv.length + ciphertext.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ciphertext), iv.length);
  return Buffer.from(combined).toString("base64");
}

export async function decrypt(encrypted: string): Promise<string> {
  const combined = Buffer.from(encrypted, "base64");
  const iv = combined.slice(0, 12);
  const ciphertext = combined.slice(12);
  const key = await getKey();
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext
  );
  return decoder.decode(decrypted);
}
