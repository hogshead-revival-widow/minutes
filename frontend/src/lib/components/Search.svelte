<script lang="ts" context="module">
	import { fade } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { ICONS, SINGLE_SEARCHBOX_PER_PAGE_ID } from '$lib/config';
</script>

<script lang="ts">
	export const classes = 'sticky-menu-button is-outlined';
	let unique = {};
	const focusSearch = () => {
		unique = {};
		const searchbox = document.querySelector(`#${SINGLE_SEARCHBOX_PER_PAGE_ID}`);
		searchbox instanceof HTMLElement && searchbox.focus();
	};
</script>

{#key unique}
	<button class={classes} on:click={focusSearch} title="Zur Suche springen" in:fade>
		<span class="icon"><Fa {...ICONS['SEARCH']} /></span>
	</button>
{/key}
