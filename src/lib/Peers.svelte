<script>
	export let peers = [];
</script>

{#if peers && peers.length}
	<div class="p-2 bg-neutral-900">
		Peers
		{#each peers as peer}
			<div class="m-1 p-1 flex flex-row items-left text-green-400 text-sm font-mono">
				{peer}
			</div>
		{/each}
	</div>
{/if}
