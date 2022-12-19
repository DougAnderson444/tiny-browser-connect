<script>
	import Chevron from '$lib/Chevron.svelte';
	import { slide } from 'svelte/transition';

	let onClick = () => {
		open = !open;
	};

	let open;
	let duration = 300;
	export let containerStyle = 'bg-neutral-600';
	let commonStyle = 'rounded max-w-full p-4 ';

	function clickOutside(node, { enabled: initialEnabled, cb }) {
		const handleOutsideClick = ({ target }) => {
			if (!node.contains(target)) {
				cb();
			}
		};

		function update({ enabled }) {
			if (enabled) {
				window.addEventListener('click', handleOutsideClick);
			} else {
				window.removeEventListener('click', handleOutsideClick);
			}
		}

		update({ enabled: initialEnabled });
		return {
			update,
			destroy() {
				window.removeEventListener('click', handleOutsideClick);
			}
		};
	}
</script>

<section
	use:clickOutside={{ enabled: open, cb: () => (open = false) }}
	class="{containerStyle} {commonStyle} relative flex flex-row justify-end items-end md:w-1/2 m-4 text-neutral-200"
>
	<button class="flex-0 z-20" on:click={onClick}>
		<Chevron {duration} {open} />
	</button>
	<div class="flex-1 {containerStyle} {commonStyle} absolute top-0 right-0 w-full z-10">
		<div class="" on:click={onClick}>
			<slot name="title" />
		</div>
		{#if open}
			<div transition:slide={{ duration }} class="absoulte h-96 min-h-fit z-10 overflow-y-auto">
				<slot />
			</div>
		{/if}
	</div>
</section>
