<script>
	import { setContext } from 'svelte';

	export let wallet;
	export let ownerAddress;
	export let local = false;

	setContext('wallet', wallet);
	setContext('local', local);
	setContext('ownerAddress', ownerAddress);
</script>

<slot />
