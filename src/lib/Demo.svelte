<script>
	import WalletManager from './WalletManager.svelte';
	import { onMount } from 'svelte';
	import { getAddress } from './utils';
	import Contacts from './Contacts.svelte';
	import Repo from './Repo.svelte';
	import Mount from './Mount.svelte';

	let wallet;
	let ownerAddress;
	let RSAPublicKey;
	let Ed25519PublicKey;
	let base64URLEdwardsKey;
	let connect;
	let username;
	let data;

	onMount(async () => {
		// browser env, load the library now
		({ connect } = await import('./lib'));
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
	function handleConnect() {}
	function handleClose() {}
	function handleMsg() {}
</script>

<WalletManager let:wallet let:ownerAddress let:RSAPublicKey on:Ed25519PublicKey={keyConnect} />
<div class="flex flex-row h-screen">
	<Contacts {Ed25519PublicKey} {username} />
	<div class="flex-1 bg-neutral-700 text-neutral-200">
		<Repo let:esModule let:props let:handleChange>
			<Mount src={esModule} {props} on:change={handleChange} />
		</Repo>
	</div>
</div>
