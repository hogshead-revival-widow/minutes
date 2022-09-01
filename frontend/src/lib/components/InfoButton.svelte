<script context="module" lang="ts">
	import { getContext } from 'svelte';
	import Fa from 'svelte-fa';
	import Info from '$lib/components/Info.svelte';
	import { ICONS } from '$lib/config';
</script>

<script lang="ts">
	// @ts-expect-error: Bug in svelte language tools
	const { open } = getContext('simple-modal');
</script>

<footer class="has-text-centered mt-6">
	<button
		on:click={() => open(Info)}
		class="button has-text-primary is-clickable is-ghost is-size-4"
		title="FAQ anzeigen"
	>
		<Fa {...ICONS['INFO']} />
	</button>
</footer>
