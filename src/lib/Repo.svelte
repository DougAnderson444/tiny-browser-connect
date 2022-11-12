<script>
	import { onMount } from 'svelte';
	import { CID } from 'multiformats/cid';
	import Saver from './Saver.svelte';

	import ContactCard from '../../../awesome-components-kit/src/lib/compiled/ContactCard.svelte.js?raw';

	export let wallet;

	let dag;
	let roots = [];
	let rootObj;
	let selectedTag = 'ContactCard';
	let tagNode, esModule, props;

	let handleRootCIDChange;
	let saveToBrowser;

	onMount(async () => {
		// browser env, load the library now
		const { createDag, createContactCard } = await import('./lib');
		dag = await createDag();
		dag.on('rootCID', (val) => handleRootCIDChange());

		// check if localstorage is available
		if (typeof localStorage !== 'undefined') {
			saveToBrowser = (key, value) => localStorage.setItem(key, value);
			const res = localStorage.getItem('ROOT_CID');
			if (res) {
				const cid = CID.asCID(res) || CID.parse(res);
				if (cid) {
					dag.rootCID = cid;
					roots = [...roots, cid.toString()];
					console.log('roots', roots);
					rootObj = (await dag.get(cid)).value;
				}
			}
		}

		handleRootCIDChange = async () => {
			console.log('handleRootCIDChange', dag.rootCID.toString());
			if (!dag.rootCID) return;
			const cid = CID.asCID(dag.rootCID) || CID.parse(dag.rootCID);
			console.log('cid', cid);
			if (!cid) return;

			// update rootObj
			rootObj = (await dag.get(cid)).value;

			// save rootCID to the browser if poss
			if (saveToBrowser) saveToBrowser('ROOT_CID', cid.toString());

			roots = [...roots, cid.toString()];

			console.log('roots', roots);
		};

		// check if tag 'contactCard' already exists in the dag
		// if not, create it
		let exists = false;
		try {
			exists = await dag.latest('ContactCard');
		} catch (error) {
			console.log('tag does not exist, create it');
		}

		if (!exists) {
			try {
				await createContactCard(dag);
				dag = dag; // refresh svelte UI
			} catch (error) {
				console.log('error creating contact card');
			}
		} else {
			console.log('tag exists, load it');
		}

		try {
			tagNode = await dag.latest('ContactCard');
		} catch (error) {
			console.log('error loading tag');
		}

		try {
			props = (await dag.latest('ContactCard', 'data')).value || null;
		} catch (error) {
			console.log('No prop data, but thats ok');
		}
		try {
			esModule = (await dag.latest('ContactCard', 'compiled')).value;
		} catch (error) {
			console.log('No compiled module, thats an issue');
		}
	});
</script>

{#if rootObj}
	<ul class="w-1/3 list-none">
		{#each Object.keys(rootObj) as tag}
			<li
				class="bg-neutral-600 w-full rounded m-4 p-4 cursor-pointer user-select-none"
				on:click={(e) => (selectedTag = tag)}
			>
				{tag}
			</li>
		{/each}
	</ul>
{/if}

{#if esModule && selectedTag}
	<Saver let:handleChange tag={selectedTag} {dag} {tagNode} {wallet}>
		<slot {handleChange} {esModule} {props} />
	</Saver>
{/if}

{#if roots}
	<div class="m-4 p-4">
		Showing roots
		<div class="font-mono text-xs overflow-auto">
			{#each roots as root}
				<div>
					{root}
				</div>
			{/each}
		</div>
	</div>
{/if}
