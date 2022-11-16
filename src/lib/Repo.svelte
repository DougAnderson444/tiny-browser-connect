<script>
	import { onMount } from 'svelte';
	import { CID } from 'multiformats/cid';
	import Saver from './Saver.svelte';
	import RepoMenu from './RepoMenu.svelte';

	let dag;
	let roots = [];
	let rootObj;

	let handleRootCIDChange;
	let saveToBrowser;
	let initCommit;

	onMount(async () => {
		// browser env, load the library now
		const { createDag, createContactCard } = await import('./lib');
		dag = await createDag({ persist: true });
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
					rootObj = (await dag.get(cid)).value;
				}
			}
		}

		handleRootCIDChange = async () => {
			if (!dag.rootCID) return;
			const cid = CID.asCID(dag.rootCID) || CID.parse(dag.rootCID);
			if (!cid) return;

			// update rootObj
			rootObj = (await dag.get(cid)).value;

			// save rootCID to the browser if poss
			if (saveToBrowser) saveToBrowser('ROOT_CID', cid.toString());

			roots = [...roots, cid.toString()];
		};
	});
</script>

<section class="w-full">
	<RepoMenu {dag} let:esModule let:props let:selectedTag let:commits let:tagNode>
		<Saver let:handleChange tag={selectedTag} {dag} {tagNode} {commits}>
			<slot {handleChange} {esModule} {props} />
		</Saver>
	</RepoMenu>

	{#if roots}
		<div class="m-4 p-4">
			<div class="font-mono text-xs overflow-auto">
				{#each roots as root}
					<div>
						{root}
					</div>
				{/each}
			</div>
		</div>
	{/if}
</section>
