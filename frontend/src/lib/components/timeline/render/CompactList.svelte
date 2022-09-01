<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import DateTime from '$lib/components/basic/datetime/DateTime.svelte';
	import Share from '$lib/components/Share.svelte';
	import More from '$lib/components/event/More/index.svelte';
	import Contact from '$lib/components/event/More/Contact.svelte';
	import Toggle from '$lib/components/event/Toggle.svelte';
	import { getAllContextStores } from '$lib/actions/context';
	import { ICONS, LOG_COLLECTION_DATE_FORMAT_SHORT } from '$lib/config';
</script>

<script lang="ts">
	// @ts-expect-error: Bug in svelte language tools
	const { open } = getContext('simple-modal');
	const { collection, timeline, options } = getAllContextStores();
	const { activeFilters } = $options;
	export let filterForEventIDs: string[] = [];
	$: events =
		filterForEventIDs.length > 0
			? $timeline.filter((event) => filterForEventIDs.includes(event.id))
			: $timeline;
	$: timelist = $options.sortBy === 'oldestFirst' ? [...events].reverse() : events;

	const showMore = (item) =>
		open(More, { currentEvent: writable(item), collection, timeline, activeFilters });
</script>

{#key timelist.length}
	<article class="list boxed-content has-hoverable-list-items has-overflow-ellipsis" in:fade|local>
		{#if timelist.length > 0}
			{#each timelist as item (item.id)}
				<div class="list-item  p-1 pb-3" id="event-{item.id}">
					<div class="list-item-content">
						<div class="list-item-title is-clickable" on:click={() => showMore(item)}>
							{item.title}
						</div>

						<div
							class:mb-2={item?.description}
							class="list-item-title has-text-weight-normal has-text-grey  is-clickable"
						>
							<span on:click={() => showMore(item)}>
								<DateTime
									date={item.date}
									time={item.time}
									dateFormat={LOG_COLLECTION_DATE_FORMAT_SHORT}
								/>
							</span>
							<span class="list-item-controls" style="display: inline;">
								<span class="field has-addons is-pulled-right">
									<p class="control">
										<Toggle
											attribute="isImportant"
											classes="is-small has-text-black"
											message={{
												activate: 'Als wichtig markieren',
												deactivate: 'Als unwichtig markieren'
											}}
											bind:currentEvent={item}
											{collection}
											{timeline}
											{activeFilters}
											icon={ICONS['IMPORTANT']}
										/>
									</p>
									<p class="control">
										<Toggle
											attribute="isConfirmed"
											classes="is-small has-text-black"
											message={{
												activate: 'Als geprüft markieren',
												deactivate: 'Als ungeprüft markieren'
											}}
											bind:currentEvent={item}
											{collection}
											{timeline}
											{activeFilters}
											icon={ICONS['CONFIRMED']}
										/>
									</p>

									<p class="control">
										<Share
											isRight={true}
											message="Link zu diesem Ereignis kopiert!"
											title="Ereignis-Link teilen"
											classes="is-small has-text-primary"
											target={$page.url.href.includes('event')
												? $page.url.href
												: $page.url.href.split('?')[0] + '/event/' + item.id}
										/>
									</p>

									{#if item.contact}
										<p class="control">
											<Contact
												classes="is-small has-text-primary"
												mail={item.contact}
												currentEvent={item}
											/>
										</p>
									{/if}
								</span>
							</span>
						</div>

						{#if item?.description}
							<div class="list-item-description has-text-weight-normal has-text-grey">
								{@html item.description.replaceAll(/<p>|<\/p>|<br>|<br \/>/gi, ' ')}
							</div>
						{/if}
					</div>
				</div>
			{/each}
		{:else}
			<article>
				<p class=" lead">Leider nichts passendes gefunden.</p>
				{#if $activeFilters.length > 0}
					<p class="mt-2">Entferne Filter, um ggf. mehr Ergebnisse zu erhalten.</p>
				{/if}
			</article>
		{/if}
	</article>
{/key}
