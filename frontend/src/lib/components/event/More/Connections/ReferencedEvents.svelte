<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { fade, fly } from 'svelte/transition';
	import AutoComplete from 'simple-svelte-autocomplete';
	import Fa from 'svelte-fa';
	import DateTime from '$lib/components/basic/datetime/DateTime.svelte';
	import { ICONS, LOG_COLLECTION_DATE_FORMAT_SHORT } from '$lib/config';
	import { Minutes } from '$lib/api';
	import { updateEventsInStore } from '$lib/actions/context';
	import type { Filter } from '$lib/actions/filter';
	import type { CollectionRead, EventRead, EventSimpleRead } from '$lib/api/data-contracts';
</script>

<script lang="ts">
	export let currentEvent: Writable<EventRead>;
	export let collection: Writable<CollectionRead>;
	export let timeline: Writable<EventRead[]>;
	export let activeFilters: Writable<Filter[]>;

	// @ts-expect-error: Bug in svelte language tools
	const { close } = getContext('simple-modal');

	let filterForEventIDs: string[] = [];
	$: filterForEventIDs = $currentEvent.referencedEvents.map((event) => event.id);
	$: eventsToLinkFound = $collection.events.length - filterForEventIDs.length > 1;
	let selectedItem = undefined;

	const linkEvent = async (eventToReference: EventSimpleRead) => {
		const { id } = eventToReference;
		try {
			$currentEvent = await Minutes.linkEvent($currentEvent.id, id);
			updateEventsInStore(collection, timeline, activeFilters, [$currentEvent]);
		} catch (error) {
			console.error(error);
		}
	};

	const unlinkEvent = async (referencedEvent: EventSimpleRead) => {
		const { id } = referencedEvent;
		try {
			$currentEvent = await Minutes.unlinkEvent($currentEvent.id, id);
			updateEventsInStore(collection, timeline, activeFilters, [$currentEvent]);
		} catch (error) {
			console.error(error);
		}
	};
</script>

{#if eventsToLinkFound && !$currentEvent.isFrozen}
	<div class="field ">
		<div class="control">
			<AutoComplete
				inputId="add-referenced-event"
				items={$collection.events.filter(
					(event) => event.id !== $currentEvent.id && !filterForEventIDs.includes(event.id)
				)}
				name="add-referenced-event"
				bind:selectedItem
				placeholder={'Weiteres Ereignis verknüpfen...'}
				valueFieldName="id"
				keywordsFieldName="title"
				maxItemsToShowInList={5}
				noResultsText={'Nicht gefunden'}
				moreItemsText={' weitere Ereignisse ausgeblendet'}
				labelFieldName="title"
			>
				<div slot="item" let:item let:label>
					<span class="is-pulled-right">
						<DateTime
							date={item.date}
							time={item.time}
							dateFormat={LOG_COLLECTION_DATE_FORMAT_SHORT}
						/>
					</span>
					{item.title}
				</div>
			</AutoComplete>
		</div>

		{#key selectedItem}
			<button
				class:is-invisible={selectedItem === undefined}
				in:fade|local
				type="submit"
				on:click={async () => {
					await linkEvent(selectedItem);
					selectedItem = undefined;
				}}
				class="block is-normal form-button is-fullwidth mt-4"
			>
				Verknüpfen
			</button>
		{/key}
	</div>
{:else if !$currentEvent.isFrozen}
	<p>Es gibt im Moment keine Ereignisse, die verknüpft werden können.</p>
{/if}

{#if filterForEventIDs.length > 0}
	<div class="mb-6">
		<p class="label">Verknüpfte Ereignisse</p>
		<ul>
			{#each $currentEvent.referencedEvents as reference (reference.id)}
				<li transition:fly|local class="is-flex is-justify-content-space-between">
					<a
						href="/collection/{$currentEvent.collectionId}/event/{reference.id}"
						target="new"
						sveltekit:prefetch
					>
						{reference.title}
					</a>

					{#if !$currentEvent.isFrozen}
						<button
							class="is-small button is-outlined is-danger"
							on:click|preventDefault={() => unlinkEvent(reference)}
							title="Verknüpfung löschen"
						>
							<Fa {...ICONS['DELETE']} />
						</button>
					{/if}
				</li>
			{/each}
		</ul>
		<a
			class="form-button"
			href="/collection/{$collection.id}?referencedEvents={$currentEvent.id}"
			title="Auf dieses Ereignis filtern"
			sveltekit:prefetch
			on:click={close}
		>
			<span class="icon mr-1">
				<Fa {...ICONS['FILTER']} />
			</span>
			Auf diese Ereignis{filterForEventIDs.length > 1 ? 'se' : ''} filtern
		</a>
	</div>
{:else}
	<p transition:fade|local>
		Noch sind keine Ereignisse mit diesem Ereignis verknüpft.
		{#if !$currentEvent.isFrozen}
			Tippe in die Eingabebox, um ein zu verknüpfendes Ereignis auszuwählen.
		{/if}
	</p>
{/if}
