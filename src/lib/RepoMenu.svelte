<script>
	// @ts-nocheck
	/**
	 * Manages SelectedTag and pulling up the TagNode data for the slot
	 */
	import { onMount } from 'svelte';
	import contactCard from './Apps/ContactCard.svelte.js?raw';
	import { CID } from 'multiformats/cid';
	import DropDown from './DropDown.svelte';
	import TagNode from './TagNode.svelte';

	export let dag;

	let rootObj;
	let commitTagData;
	let selectedTag;
	let commits = null;
	let tags;
	let tagNode, props, esModule;

	$: if (dag && commitTagData) handleDagReady(dag);
	$: if (selectedTag) loadLatest(selectedTag);

	onMount(async () => {
		({ commitTagData } = await import('./lib'));
	});

	async function handleDagReady(dag) {
		dag.on('rootCID', (_) => handleDagReady(dag));

		if (!dag.rootCID) {
			makeDefault();
			return;
		}
		const cid = CID.asCID(dag.rootCID) || CID.parse(dag.rootCID);
		if (!cid) return;

		// update rootObj
		rootObj = (await dag.get(cid)).value;
		tags = Object.keys(rootObj);
		if (!tags) makeDefault();
		if (!selectedTag) selectedTag = tags[0];
	}

	async function makeDefault() {
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
				const params = {
					dag,
					tag: 'ContactCard',
					data: contactCard,
					key: 'compiled',
					tagNode: {}
				};
				commits = [await commitTagData(params)];
				dag = dag; // refresh svelte UI
				selectedTag = 'ContactCard';
			} catch (error) {
				console.log('error creating contact card', error);
			}
		} else {
			console.log('tag exists, load it');
		}
	}

	async function loadLatest(tag) {
		try {
			tagNode = await dag.latest(tag);
		} catch (error) {
			console.log('error loading tag', error);
		}
		try {
			props = (await dag.latest(tag, 'data')).value || null;
		} catch (error) {
			console.log('No prop data, but thats ok', error);
		}
		try {
			esModule = (await dag.latest(tag, 'compiled')).value;
		} catch (error) {
			console.log('No compiled module, thats an issue', error);
		}
	}
</script>

<DropDown>
	<div class="p-0" slot="title">{selectedTag}</div>
	<DropDown containerStyle={'bg-blue-200 text-black'}>
		<div slot="title" class="p-2 w-fit my-1">+ Add New App</div>
		<TagNode />
	</DropDown>
	{#if rootObj}
		{#each Object.keys(rootObj) as tag}
			<li class="w-full p-4 cursor-pointer user-select-none" on:click={(e) => (selectedTag = tag)}>
				{tag}
			</li>
		{/each}
	{/if}
</DropDown>

{#if esModule}
	<slot {props} {esModule} {selectedTag} {commits} {tagNode} />
{/if}

<!--
<div class="relative inline-block text-left">
	<div>
		<button
			type="button"
			class="flex flex-col
			justify-center w-full rounded-md border border-gray-300 shadow-sm
			px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50
			focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			id="options-menu"
			aria-haspopup="true"
			aria-expanded="true"
		>
			<div class="rounded-full m-[1px] h-[6px] w-[6px] bg-gray-600" />
			<div class="rounded-full m-[1px] h-[6px] w-[6px] bg-gray-600" />
			<div class="rounded-full m-[1px] h-[6px] w-[6px] bg-gray-600" />
		</button>
	</div>

	<div
		class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
	>
		<div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
			<a
				href="#"
				class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
				role="menuitem"
			>
				Account settings
			</a>

			<a
				href="#"
				class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
				role="menuitem"
			>
				Support
			</a>

			<a
				href="#"
				class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
				role="menuitem"
			>
				License
			</a>

			<form method="POST" action="#">
				<button
					type="submit"
					class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
					role="menuitem"
				>
					Sign out
				</button>
			</form>
		</div>
	</div>
</div> -->
