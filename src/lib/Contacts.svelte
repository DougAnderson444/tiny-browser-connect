<script>
	export let contacts = [];
	export let username = '';
	async function handleSearch(e) {
		console.log('handleSearch', username);
		contacts = [...contacts, username];
	}
</script>

<input
	class="p-2 m-2 rounded-md text-neutral-800"
	type="text"
	bind:value={username}
	placeholder="Name or Public Key"
/>
<button class="p-2 m-2 rounded-md bg-neutral-800" on:click={handleSearch}>Add</button>

<div class="flex flex-col items-left">My Contacts</div>

{#if contacts?.length}
	{#each contacts as contact}
		<div class="flex flex-col items-left text-xs">
			{contact}
		</div>
	{/each}
{/if}
