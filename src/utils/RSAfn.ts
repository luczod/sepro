import * as forge from "node-forge";
import * as fs from "fs";

// Dados criptografados em formato base64
const base64EncryptedData =
  "DnDwAW9TdTZjPWiryqs8AEZA8//2noVfDF6K8qnMxGltBTzBx5pFyTohVzJrpjoUyr5Lgb2lQy9qQENJN5iJtAYX30f3NwVq4f244QeLdKfBbOx1V1JnYBJWitAfeZ3YcKaRdRLUb3ggJaEA3tD6E71+mXFTeYlaHYR+Cx7pJWeFN7Al99RpUITV9Cm/laueMMUBKIqq2R0Y07/SZ/zJJDGZV6vrybGzNJDNMuB+gC6m9lQ7cg/k33PXDkM9lidBg+gos0uu9HurLWK2wSrJBmaRdqP2wkIj9gxjZT02YB+IOVZ9q1TX3tew1+CbMHGdSq9daH3L5bLJrMjNy9zNgA==";

function normalizeWord(word: string): string {
  word = word
    ?.normalize("NFD") // Normalizar caracteres Unicode (acentos)
    .replace(/[\u0300-\u036f]/g, ""); // Remover caracteres acentuados
  // Substituir 'ç' por 'c'
  word = word.replace(/ç/g, "c");
  return word;
}

export async function RsaToSting(inputValor: string) {
  // openssl x509 -inform der -in certificate.cer -out certificate.pem
  // -----BEGIN RSA PRIVATE KEY----------END RSA PRIVATE KEY-----
  const privateKeyPem = fs.readFileSync(
    "D:\\serpro\\inicial\\chave-privada.pem",
    "utf8"
  );

  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  // Convert the base64-encoded data to bytes
  try {
    // Convert the base64-encoded data to bytes
    const encryptedDataBytes = forge.util.decode64(inputValor);

    // Decrypt the data using RSA-OAEP padding
    const decryptedBytes = privateKey.decrypt(
      encryptedDataBytes,
      "RSAES-PKCS1-V1_5"
    );

    // Convert the decrypted bytes to a string (assuming the original data was a string)
    const decryptedData = forge.util.decodeUtf8(decryptedBytes);
    console.log("Decrypted: ", normalizeWord(decryptedData));
    return normalizeWord(decryptedData);
  } catch (error) {
    console.error("Decryption Error:", error.message);
    return null;
  }
}
RsaToSting(base64EncryptedData);
