<script lang="ts">
	import { onMount } from 'svelte';
	import Publish from './Publish.svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import localforage from 'localforage';

	export let tag;
	export let tagNode;
	export let data;
	export let dag;

	let states = {
		saving: 'saving',
		saved: 'saved',
		ready: null
	};

	let state = 'saved';

	let unpublishedBuffers: Uint8Array[] = [];

	onMount(async () => {
		// set unpublishedBuffers to cache save din localStorage, if any
		try {
			const value = await localforage.getItem('unpublishedBuffers');
			// This code runs once the value has been loaded
			// from the offline store.
			console.log('Got', value);
			unpublishedBuffers = value ? value : [];
		} catch (err) {
			// This code runs if there were any errors.
			console.log(err);
		}

		// loop through each in the array and cast the type to new Uint8Array
		unpublishedBuffers = unpublishedBuffers.length
			? unpublishedBuffers.map((buffer: any) => new Uint8Array(buffer))
			: [];
		console.log('LS: unpublishedBuffers', unpublishedBuffers);
	});

	async function handleSave() {
		state = 'saving';
		console.log(state, { data, tagNode });
		if (!data || !tagNode) return;
		const dataCid = await dag.tx.addData({ value: data });
		tagNode.data = dataCid;
		console.log('saving tagNode', tagNode);
		await dag.tx.add(tag, tagNode);
		const buffer = await dag.tx.commit();
		unpublishedBuffers = [...unpublishedBuffers, new Uint8Array(buffer)];
		cache();
		dag = dag; // refresh svelte UI
		console.log('saved tagNode', dag.rootCID.toString());

		state = 'saved';
	}

	function handleChange(e) {
		console.log(e.detail);
		data = e.detail;
		state = null;
	}
	function handlePublished() {
		unpublishedBuffers = [];
		clearCache();
	}

	function cache() {
		localforage
			.setItem('unpublishedBuffers', unpublishedBuffers)
			.then(function (value) {
				console.log('Saved', value);
			})
			.catch(function (err) {
				console.log(err);
			});
	}
	function clearCache() {
		localStorage.removeItem('unpublishedBuffers');
	}
	$: if (unpublishedBuffers) console.log('unpublishedBuffers', unpublishedBuffers);
</script>

<div class="relative">
	<button
		class="relative flex-0 w-fit p-2 shadow-lg rounded-r-lg text-white font-semibold select-none
		{state == 'saved' ? 'cursor-not-allowed bg-gray-400' : 'cursor-pointer bg-blue-500'}"
		on:click={handleSave}
		disabled={!data || state == 'saved'}
	>
		{state == 'saving' ? 'Saving' : state == 'saved' ? 'Saved' : 'Save'}
	</button>

	<!-- when state goes from saving to saved fly Publish out to the right -->
	<!-- && unpublishedBuffers.length > 0  -->
	{#if state == 'saved' && unpublishedBuffers.length > 0}
		<div
			class="inline-block"
			transition:fly={{ delay: 0, duration: 300, x: -100, y: 0, opacity: 0.5, easing: quintOut }}
		>
			<Publish {dag} {state} bytes={unpublishedBuffers} on:published={handlePublished} />
		</div>
	{/if}
</div>
<slot {handleChange} />
