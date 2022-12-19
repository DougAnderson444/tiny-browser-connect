<script lang="ts">
	export let open = false;
	export let duration;
</script>

<button class="{open ? 'rotate-180 ' : ''} duration-{duration}">
	<svg
		class="stroke-neutral-200"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="3"
	>
		<path d="M19 9l-7 7-7-7" />
	</svg>
</button>

<style lang="postcss">
	svg {
		@apply h-6 w-6;
	}
</style>
