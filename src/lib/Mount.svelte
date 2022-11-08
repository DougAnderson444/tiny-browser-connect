<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';

	export let src: string;
	export let props = null;

	let target: HTMLElement;
	const dispatch = createEventDispatcher();

	onMount(async () => {
		if (!src) return;
		mountSrc({ text: src, target, props });
	});

	async function mountSrc({
		text,
		target,
		props
	}: {
		text: string;
		target: HTMLElement;
		props: any;
	}) {
		dispatch('target', target);
		const blob = new Blob([text], { type: 'text/javascript' });
		const url = URL.createObjectURL(blob);
		const App = (await import(/* @vite-ignore */ url)).default;
		dispatch('ready', App);
		target.innerHTML = '';
		const app = new App({
			target,
			props
		});
		if (url) URL.revokeObjectURL(url); // memory management
		dispatch('mounted', app);
		app.$on('change', (evt: CustomEvent) => {
			dispatch('change', evt.detail);
		});
		return app;
	}
</script>

<div bind:this={target} />
