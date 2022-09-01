<script lang="ts" context="module">
	import Fa from 'svelte-fa';
	import { getAllContextStores } from '$lib/actions/context';
	import { fade } from 'svelte/transition';
	import { ICONS } from '$lib/config';
</script>

<script lang="ts">
	const { options } = getAllContextStores();
	const displayModes: typeof $options.renderAs[] = ['LIST', 'COMPACT_LIST'];
	let currentDisplayMode = 0;
	const max = displayModes.length - 1;

	const toggle = () => {
		currentDisplayMode += 1;
		if (currentDisplayMode > max) currentDisplayMode = 0;
		$options.renderAs = displayModes[currentDisplayMode];
	};
</script>

{#key currentDisplayMode}
	<button
		class="sticky-menu-button is-outlined"
		on:click={toggle}
		title="Protokoll kompakter / übersichtlicher darstellen"
		in:fade|local
	>
		<span class="icon">
			<Fa {...ICONS['COMPRESS']} />
		</span>
	</button>
{/key}
