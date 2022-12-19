<script lang="ts">
	import Chevron from './Chevron.svelte';
	import { slide } from 'svelte/transition';

	export let title: string = 'Title';

	export let items;
</script>

<section>
	<header>
		<Chevron {open} {onClick} />

		{title}
	</header>
	{#if open}
		<div transition:slide={{ duration: 300 }}>
			<slot />
		</div>
	{/if}
</section>
