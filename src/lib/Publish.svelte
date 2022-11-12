<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	export let state = 'saved';
	export let bytes: Uint8Array[] | null;
	// @ts-ignore
	export let wallet: handlers; // @peerpiper/iframe-wallet-sdk

	const dispatch = createEventDispatcher();

	function publish(bytes: Uint8Array[]) {
		// TODO
		console.log('publishing', { bytes });
	}

	// Publishes the dag tag to Arweave, gives you a URL to see the compponent and data if you have access
	async function handlePublish(e) {
		console.log('publishing', { bytes });
		// pass in the dag tag, get a URL out
		if (!bytes) return;
		const url = publish(bytes);

		dispatch('published', url);
	}
</script>

<button
	disabled={!bytes}
	on:click={handlePublish}
	class="flex-0 w-fit -m-3 pl-4 p-2 shadow-lg rounded-r-lg text-white font-semibold select-none
		{state == 'saved' ? 'cursor-pointer bg-blue-500' : 'cursor-not-allowed bg-gray-400'}"
	>Publish</button
>
