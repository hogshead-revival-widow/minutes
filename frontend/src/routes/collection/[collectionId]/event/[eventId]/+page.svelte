<script lang="ts" context="module">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import More from '$lib/components/event/More/index.svelte';
	import InfoButton from '$lib/components/InfoButton.svelte';
	import { startRefreshing } from '$lib/actions/refresh';
	import { contextualise } from '$lib/actions/context';
	import type { CollectionRead, EventRead } from '$lib/api/data-contracts';
</script>

<script lang="ts">
	export let data: { collectionRead: CollectionRead; eventRead: EventRead };
	const { collectionRead, eventRead } = data;
	const { collection, timeline, options } = contextualise(collectionRead);
	const { activeFilters } = $options;
	const currentEvent = writable(eventRead);
	onMount(() => startRefreshing());
</script>

<svelte:head>
	<title>Ereignis: {eventRead.title}</title>
</svelte:head>

<More {currentEvent} {collection} {timeline} asModal={false} {activeFilters} />

<InfoButton />
