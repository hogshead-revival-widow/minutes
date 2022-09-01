<script lang="ts" context="module">
	import Fa from 'svelte-fa';
	import { getAllContextStores } from '$lib/actions/context';
	import { fade } from 'svelte/transition';
	import { ICONS } from '$lib/config';
</script>

<script lang="ts">
	const { options } = getAllContextStores();
	let refreshed = {};
	let previousMode: typeof $options.renderAs = 'LIST';
	const toggle = () => {
		refreshed = {};
		if ($options.renderAs === 'CHARTS') {
			$options.renderAs = previousMode;
			return;
		}
		previousMode = $options.renderAs;
		$options.renderAs = 'CHARTS';
	};
</script>

{#key refreshed}
	<button
		class="sticky-menu-button is-outlined"
		on:click={toggle}
		title="Protokoll-Visualisierung / Listen-Ansicht wechseln"
		in:fade|local
	>
		<span class="icon">
			<Fa {...ICONS['CHARTS']} />
		</span>
	</button>
{/key}
