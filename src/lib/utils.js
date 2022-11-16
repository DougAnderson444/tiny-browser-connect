import * as b64 from '@stablelib/base64';
import * as sha256 from '@stablelib/sha256';

export function getArweaveAddress(jwk) {
	// get uint8array of the string
	const bytes = b64.decodeURLSafe(jwk.n);

	// get the isomorphic hash of the asset as the tag
	const hashed = hash(bytes); // make tag unique, so that it can go to a new owner without conflict
	const hashB64 = b64.encodeURLSafe(new Uint8Array(hashed)).replace('=', '');
	return hashB64;
}

export function getAddress(Ed25519PublicKey) {
	// get the isomorphic hash of the asset as the tag
	const hashed = sha256.hash(new Uint8Array(Ed25519PublicKey)); // make tag unique, so that it can go to a new owner without conflict
	const hashB64 = b64.encodeURLSafe(new Uint8Array(hashed)).replace('=', '');
	return hashB64;
}
