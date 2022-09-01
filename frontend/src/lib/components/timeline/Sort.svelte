<script lang="ts" context="module">
	import { fade } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { faSort } from '@fortawesome/free-solid-svg-icons';
	import { getContextStore } from '$lib/actions/context';
</script>

<script lang="ts">
	export const classes = 'sticky-menu-button is-outlined';
	const options = getContextStore('options');
	const toggle = () => {
		$options.sortBy = $options.sortBy === 'newestFirst' ? 'oldestFirst' : 'newestFirst';
	};
</script>

{#key $options.sortBy}
	<button class={classes} on:click={toggle} title="Protokoll-Sortierung ändern" in:fade>
		<span class="icon"><Fa icon={faSort} /></span>
	</button>
{/key}
