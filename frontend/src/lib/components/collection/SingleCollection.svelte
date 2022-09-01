<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { writable, type Writable } from 'svelte/store';
	import { page } from '$app/stores';
	import Title from '$lib/components/basic/Title.svelte';
	import ChangeTitle from '$lib/components/collection/ChangeTitle.svelte';
	import Add from '$lib/components/event/Add.svelte';
	import SearchBox from '$lib/components/SearchBox.svelte';
	import Sidebar from '$lib/components/timeline/Sidebar.svelte';
	import Fa from 'svelte-fa';
	import { getAllContextStores } from '$lib/actions/context';
	import { makeTimeline } from '$lib/actions/timeline';
	import FilterBox from '$lib/components/timeline/filter/FilterBox.svelte';
	import { ICONS, RENDER_AS } from '$lib/config';
	import { makeReferencedEventFilter } from '$lib/actions/filter';
	import type Fuse from 'fuse.js';
</script>

<script lang="ts">
	const { collection, timeline, options } = getAllContextStores();
	let searchedEvents: Writable<typeof $collection.events> = writable([]);
	let filteredEvents: Writable<typeof $collection.events> = writable([]);
	let isSearching = false;
	const searchOptions: Fuse.IFuseOptions<typeof $collection.events[number]> = {
		keys: ['title', 'description', 'entities.name'],
		useExtendedSearch: true
	};
	const { activeFilters } = $options;
	// @ts-expect-error: Bug in svelte language tools
	const { open } = getContext('simple-modal');
	$: {
		const referencedEventQuery = $page.url.searchParams.get('referencedEvents');
		$page.url.searchParams.delete('referencedEvents');
		const referencedEvent =
			referencedEventQuery !== null
				? $collection.events.find((event) => event.id === referencedEventQuery)
				: undefined;
		if (
			referencedEvent !== undefined &&
			!$activeFilters.some((filter) => filter.id === referencedEvent.id)
		) {
			$activeFilters = [...$activeFilters, makeReferencedEventFilter(referencedEvent)];
		}
	}

	$: $timeline = makeTimeline($filteredEvents);
</script>

<SearchBox
	toSearch={$collection.events}
	bind:isSearching
	{searchOptions}
	searchResult={searchedEvents}
	disabled={$collection.events.length === 0}
	placeholder="Ereignisse durchsuchen..."
	matchCountBase={filteredEvents}
>
	<span on:click={() => open(ChangeTitle, { collection })} class="is-clickable">
		<Title title={$collection.title} />
	</span>

	{#if $collection.events.length === 0}
		<div class="has-text-centered">
			<button
				class="form-button"
				on:click={() => open(Add, { collection, timeline, activeFilters })}
			>
				<span class="icon">
					<Fa {...ICONS['PLUS']} />
				</span>
				<span> Erstes Ereignis anlegen (jederzeit änderbar)</span>
			</button>
		</div>
	{/if}
	<FilterBox
		toFilter={$searchedEvents}
		slot="searchInfo"
		filterResult={filteredEvents}
		disabled={$collection.events.length === 0}
	/>
</SearchBox>

<section class="container">
	<Sidebar />
	{#if $collection.events.length > 0}
		{#key $options.renderAs}
			<div in:fade|local>
				<svelte:component this={RENDER_AS[$options.renderAs]} />
			</div>
		{/key}
	{/if}
</section>
