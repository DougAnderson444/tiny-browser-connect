<script lang="ts">
	/**
	 * Save this /ipfs/rootCID to IPNS
	 * If there is no IPNS key, offer button to generate one and add it to DID document
	 * If there is no name or DID
	 */
	import { onMount, createEventDispatcher, getContext } from 'svelte';
	import { init, getOwnerDidArs } from '@peerpiper/did-ar';
	import type { DIDAr } from '@peerpiper/did-ar';

	export let ownerAddress: string;
	export let rootCID: string;
	export let ipnsHandle;
	export let RSAPublicKey: { kty: string; n: string; e: string; kid?: string } | null;
	export let Ed25519PublicKey: Uint8Array | null;

	const dispatch = createEventDispatcher();

	let local = getContext('local');
	let sourceTx = local ? { srcTx: null } : {}; // null out for local use

	let handleCreateDID: (() => Promise<void>) | null = null;

	let arweave = local
		? { api: { config: { host: 'localhost', port: '1984', protocol: 'http' } } }
		: { api: { config: { host: 'arweave.net', port: '443', protocol: 'https' } } };

	let allDIDs: any[];
	let didar: DIDAr;
	let did: string;

	onMount(async () => {
		didar = await init({ local }); // returns Promise

		// check to see if this arweave address has a did:ar
		// if not, offer to create one
		// if so, offer to add an ipns key to the did document
		try {
			
		allDIDs = await getOwnerDidArs({
			arweave,
			ownerAddress
		});
		} catch (error) {
			console.log('error', error);
			
		}

		handleCreateDID = async function () {
			did = await didar.create({
				RSAPublicKey,
				Ed25519PublicKey,
				...sourceTx
			});
			dispatch('didCreated', did);
		};
		console.log({ allDIDs });
	});
</script>

local {local}<br />
{#if allDIDs}
	{#await allDIDs}Searching did:ar...{:then did}{did}{/await}
{/if}

{#if !did && (!allDIDs || !allDIDs.length)}
	<button
		class="bg-green-500 rounded p-4 m-2"
		on:click={handleCreateDID}
		disabled={!RSAPublicKey || !Ed25519PublicKey || !handleCreateDID}
	>
		Create Web3ID
	</button>
{/if}
