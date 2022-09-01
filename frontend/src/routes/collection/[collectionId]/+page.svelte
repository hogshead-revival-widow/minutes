<script lang="ts" context="module">
	import { onMount } from 'svelte';
	import InfoButton from '$lib/components/InfoButton.svelte';
	import SingleCollection from '$lib/components/collection/SingleCollection.svelte';
	import { startRefreshing } from '$lib/actions/refresh';
	import { contextualise } from '$lib/actions/context';
	import type { CollectionRead } from '$lib/api/data-contracts';
</script>

<script lang="ts">
	export let data: { collectionRead: CollectionRead };
	const { collectionRead } = data;
	const { collection } = contextualise(collectionRead);
	onMount(() => startRefreshing());
</script>

<svelte:head>
	<title>Protokoll: {$collection.title}</title>
</svelte:head>

<SingleCollection />

<InfoButton />
