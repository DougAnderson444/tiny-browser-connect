<script>
	import DropDown from '$lib/DropDown.svelte';

	let items = [
		{ title: 'first', data: 'first data' },
		{ title: 'second', data: 'second data' },
		{ title: 'third', data: 'third data' },
		{ title: 'fourth', data: 'fourth data' }
	];
</script>

<DropDown>
	<div class="p-0" slot="title">My DropDown</div>
</DropDown>
