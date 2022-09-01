<script context="module" lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import InfoButton from '$lib/components/InfoButton.svelte';
	import Collections from '$lib/components/collection/Collections.svelte';
	import { startRefreshing } from '$lib/actions/refresh';
	import type { CollectionRead } from '$lib/api/data-contracts';
</script>

<script lang="ts">
	export let data: { collectionsRead: CollectionRead[] };
	const { collectionsRead } = data;
	if (collectionsRead.length === 0) {
		goto('/collection/new');
	}
	onMount(() => startRefreshing());
</script>

<svelte:head>
	<title>Alle Protokolle</title>
</svelte:head>

<Collections {collectionsRead}>
	<aside class="has-text-centered">
		<InfoButton />
	</aside>
</Collections>
