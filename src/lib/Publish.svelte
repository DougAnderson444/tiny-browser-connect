<script lang="ts">
	import { onMount, createEventDispatcher, getContext } from 'svelte';
	import type { DagRepo } from '@douganderson444/ipld-car-txs';
	import type { ArDag } from '@douganderson444/ardag';

	export let state = 'saved';
	export let bytes: Uint8Array[] | null;
	// @ts-ignore
	export let local = getContext('local');

	const ownerAddress = getContext('ownerAddress');

	const dispatch = createEventDispatcher();

	let ardag: ArDag | null = null;
	let myArDag;
	let arweave;

	onMount(async () => {
		const Buffer = await import('buffer/');
		window.Buffer = Buffer.Buffer;
		const { initializeArDag } = await import('@douganderson444/ardag');
		const { post: bundlrPost } = await import('@douganderson444/ardag/bundlrHelpers');
		const Arweave = (await import('arweave')).default;
		let arweave: Arweave;
		let post = null;
		if (local) {
			arweave = Arweave.init({
				host: 'localhost',
				port: 1984,
				protocol: 'http',
				timeout: 20000,
				logging: false
			});
			await arweave.api.get(`/mint/${ownerAddress}/1000000000000000`);
			const mine = async () => await arweave.api.get(`/mine`);
			const doPost = arweave.transactions.post;
			const p = doPost.bind(arweave.transactions);
			post = async (tx) => {
				const resp = await p(tx);
				await mine();
				return resp;
			};
		} else {
			arweave = Arweave.init({});
			post = bundlrPost;
		}

		ardag = await initializeArDag({ arweave, post });
	});

	function publish(bytes: Uint8Array[]) {
		// TODO
		console.log('publishing', { bytes });
	}

	// Publishes the dag tag to Arweave, gives you a URL to see the compponent and data if you have access
	async function handlePublish(e) {
		console.log('local?', local, { bytes });
		// pass in the dag tag, get a URL out
		if (!bytes || !bytes.length) return;

		// loop through byte array and persist
		for (let i = 0; i < bytes.length; i++) {
			const buffer = new Uint8Array(bytes[i]);
			console.log('saving', buffer);
			const rootCID = await ardag.persist({
				buffer,
				tags: []
			});
			console.log('Published rootCID', rootCID.toString());
		}
		dispatch('published', true);
	}

	$: if (bytes && bytes.length) maxSize();

	function maxSize(arr: Uint8Array[] = bytes) {
		if (!arr || !arr.length) return;
		const max = arr.reduce((acc, curr) => {
			if (curr.length > acc) return curr.length;
			return acc;
		}, 0);
		return max;
	}

	function renderSize(value) {
		if (null == value || value == '') {
			return '0 Bytes';
		}
		const unitArr = new Array('Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB');
		let index = 0;
		let srcsize = parseFloat(value);
		index = Math.floor(Math.log(srcsize) / Math.log(1024));
		let size = srcsize / Math.pow(1024, index);
		size = size.toFixed(0); //Number of decimal places reserved
		return size + unitArr[index];
	}
</script>

<button
	disabled={!bytes}
	on:click={handlePublish}
	class="flex-0 w-fit -m-3 pl-4 p-2 shadow-lg rounded-r-lg text-white font-semibold select-none
		{state == 'saved' && bytes.length > 0
		? 'cursor-pointer bg-blue-500'
		: 'cursor-not-allowed bg-gray-400'}"
	>Publish{bytes.length == 0 ? 'ed' : ''} ({renderSize(maxSize())})</button
>
