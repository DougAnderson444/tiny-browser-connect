<script>
	import Radio from './Radio.svelte';

	export let params = {
		tag: '',
		compiled: '',
		network: false
	};

	const options = [
		{
			value: true,
			label: 'Network Needed'
		},
		{
			value: false,
			label: 'Data Vault'
		}
	];
</script>

<!-- // make a component that allows you to edit a tag title, tag source code, and tag data -->
<div class="">
	<div class="">Label</div>
	<div class="text-neutral-800">
		<input class="p-1 rounded-sm" type="text" bind:value={params.tag} placeholder="Label" />
	</div>

	<div class="">Source Code</div>
	<div class="text-neutral-800">
		<input
			class="p-1 rounded-sm"
			type="text"
			bind:value={params.compiled}
			placeholder="https://github.com/..."
		/>
	</div>

	<Radio
		{options}
		fontSize={16}
		legend="Does this component need internet to work?"
		bind:userSelected={params.network}
	/>
</div>
