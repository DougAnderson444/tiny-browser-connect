<script>
	// @ts-nocheck

	import WalletManager from './WalletManager.svelte';
	import { onMount } from 'svelte';
	import { getAddress } from './utils';
	import Contacts from './Contacts.svelte';
	import Repo from './Repo.svelte';
	import Mount from './Mount.svelte';
	import Peers from './Peers.svelte';
	import { SideNav } from '@peerpiper/awesome-components-kit/utils';
	import AppContext from './AppContext.svelte';

	let local = process.env.NODE_ENV === 'development';
	let wallet;
	let ownerAddress;
	let RSAPublicKey;
	let Ed25519PublicKey;
	let base64URLEdwardsKey;
	let connect;
	let username;
	let data;
	let peers = new Set();
	let mounted;

	onMount(async () => {
		// browser env, load the library now
		({ connect } = await import('./lib'));
		mounted = true;
	});

	function keyConnect(e) {
		Ed25519PublicKey = e.detail;
		username = getAddress(Ed25519PublicKey); // username is hash of ed25519 public Key

		connect({
			username,
			topic: 'peerpiper',
			handleConnect,
			handleClose,
			handleMsg
		});
	}

	const handleAddress = (e) => (ownerAddress = e.detail);

	function handleConnect(peer) {
		console.log('handleConnect', peer);
		// add new peer peer.client_id to set
		peers = peers.add(peer.client_id);
	}
	function handleClose(peer) {
		console.log('handleClose', peer);
		// find peer in peers set and remove it
		peers = peers.delete(peer.client_id);
	}
	function handleMsg() {}
	const handleWallet = (e) => (wallet = e.detail.wallet);
</script>

<main class="w-screen">
	<WalletManager
		on:ownerAddress={handleAddress}
		on:Ed25519PublicKey={keyConnect}
		on:wallet={handleWallet}
	/>

	<div class="text-white">
		<SideNav let:hideNav>
			<section class="flex z-50 flex-col  h-full break-words break-all justify-left">
				<div class="flex flex-col items-left">
					My Stuff
					<div class="ml-2 text-sm">Username</div>
					<div class="ml-2 text-xs font-mono">{username}</div>
				</div>
				<Peers {peers} />
			</section>
		</SideNav>
	</div>
	{#if wallet && ownerAddress}
		<AppContext {wallet} {ownerAddress} {local}>
			<div class="flex flex-row min-h-screen h-full">
				<div class="flex-1 w-2/3 bg-neutral-700 text-neutral-200 pt-16">
					<Repo let:esModule let:props let:handleChange>
						<Mount src={esModule} {props} on:change={handleChange} />
					</Repo>
				</div>
			</div>
		</AppContext>
	{:else}
		<!-- Local only, no Publish  -->
	{/if}
</main>
