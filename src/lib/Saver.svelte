<script>
	import { onMount } from 'svelte';

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

	async function handleSave() {
		state = 'saving';
		console.log(state, { data, tagNode });
		if (!data || !tagNode) return;
		const dataCid = await dag.tx.addData({ value: data });
		tagNode.data = dataCid;
		console.log('saving tagNode', tagNode);
		await dag.tx.add(tag, tagNode);
		const buffer = await dag.tx.commit();
		dag = dag; // refresh svelte UI
		console.log('saved tagNode', dag.rootCID.toString());

		state = 'saved';
	}

	function handleChange(e) {
		console.log(e.detail);
		data = e.detail;
		state = null;
		// save data as props to tag
	}
</script>

<button
	class="flex-0 w-fit p-2 shadow-lg rounded-r-lg text-white font-semibold select-none {state ==
	'saved'
		? 'cursor-not-allowed bg-gray-400'
		: 'cursor-pointer bg-blue-500'}"
	on:click={handleSave}
	disabled={!data || state == 'saved'}
>
	{state == 'saving' ? 'Saving' : state == 'saved' ? 'Saved' : 'Save'}
</button>
<slot {handleChange} />
