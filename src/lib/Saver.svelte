<script lang="ts">
	import { onMount } from 'svelte';
	import Publish from './Publish.svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import * as b64 from '@stablelib/base64';

	export let tag;
	export let tagNode;
	export let data;
	export let dag;
	export let commits = null;

	let encrypt = true;

	let states = {
		saving: 'saving',
		saved: 'saved',
		ready: null
	};

	let state = 'saved';

	let unpublishedBuffers: Uint8Array[] = commits ? commits : [];

	onMount(async () => {
		// set unpublishedBuffers to cache save din localStorage, if any
		const res = localStorage.getItem('unpublishedBuffers');
		if (res) {
			const arr = JSON.parse(res);
			// for each element in arr, decode b64 into Uint8Array
			unpublishedBuffers = [...unpublishedBuffers, ...arr.map((b64str) => b64.decode(b64str))];
		} else if (unpublishedBuffers.length) {
			cache(unpublishedBuffers);
		}
		console.log({ unpublishedBuffers });
	});

	async function handleSave(tagProp = 'data') {
		console.log('Saving...', { tagProp }, { data }, { tagNode });
		state = 'saving';
		if (!data || !tagNode) return;
		const dataCid = await dag.tx.addData({ value: data });
		// Data (props) save
		tagNode[tagProp] = dataCid;
		await dag.tx.add(tag, tagNode);
		const buffer = await dag.tx.commit();
		unpublishedBuffers = [...unpublishedBuffers, new Uint8Array(buffer)];
		console.log({ unpublishedBuffers });

		cache(unpublishedBuffers);
		dag = dag; // refresh svelte UI
		state = 'saved';
	}

	function handleChange(e) {
		console.log(e.detail);
		data = e.detail;
		state = null;
		// save data as props to tag
	}
	function handlePublished() {
		console.log('Published! Clear caches');
		unpublishedBuffers = [];
		unpublishedBuffers = unpublishedBuffers;
		clearCache();
		console.log({ unpublishedBuffers });
	}

	function cache(buffers: Uint8Array[]) {
		// foreach item in buffers, b64 encode
		const b64Buffers = buffers.map((buffer) => b64.encode(buffer));
		localStorage.setItem('unpublishedBuffers', JSON.stringify(b64Buffers));
	}
	function clearCache() {
		localStorage.removeItem('unpublishedBuffers');
	}
</script>

<div class="relative">
	<button
		class="relative flex-0 w-fit p-2 shadow-lg rounded-r-lg text-white font-semibold select-none
		{state == 'saved' ? 'cursor-not-allowed bg-gray-400' : 'cursor-pointer bg-blue-500'}"
		on:click={(e) => handleSave()}
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
			<Publish {dag} {state} commits={unpublishedBuffers} on:published={handlePublished} />
		</div>
	{/if}
</div>

<div class="m-2">
	<input type="checkbox" bind:checked={encrypt} />
	<label for="encrypted">Encrypt</label>
</div>
<slot {handleChange} />
