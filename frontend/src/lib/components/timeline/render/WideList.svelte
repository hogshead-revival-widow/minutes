<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import DateTime from '$lib/components/basic/datetime/DateTime.svelte';
	import Share from '$lib/components/Share.svelte';
	import More from '$lib/components/event/More/index.svelte';
	import Contact from '$lib/components/event/More/Contact.svelte';
	import Toggle from '$lib/components/event/Toggle.svelte';
	import { getAllContextStores } from '$lib/actions/context';
	import { ICONS } from '$lib/config';
</script>

<script lang="ts">
	import { currentEvent } from '$lib/actions/event';

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

<article class="list has-hoverable-list-items  ">
	{#if timelist.length === 0}
		<article class="list-item box">
			<div class="list-item-image">
				<span class="list-item-icon">😔</span>
			</div>
			<div class="list-item-content">
				<div class="list-item-title lead">
					<p>Leider nichts passendes gefunden.</p>
				</div>
				<div class="list-item-description">
					<p>
						{#if $activeFilters.length > 0}
							<p class="mt-2">Entferne Filter, um ggf. mehr Ergebnisse zu erhalten.</p>
						{/if}
					</p>
				</div>
			</div>
		</article>
	{/if}

	{#if timelist.length > 0}
		{#each timelist as item (item.id)}
			<article class="list-item box wide-item">
				<div class="list-item-content pt-3 px-3">
					<header>
						<div class="list-item-title lead is-clickable" on:click={() => showMore(item)}>
							{item.title}
						</div>
						<div class="list-item-description is-clickable pb-3" class:mb-2={item?.description}>
							<span on:click={() => showMore(item)}>
								<DateTime date={item.date} time={item.time} />
							</span>
							<span class="list-item-controls" style="display: inline;">
								<span class="field has-addons is-pulled-right">
									<p class="control">
										<Toggle
											attribute="isImportant"
											classes="is-normal has-text-black"
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
											classes="is-normal has-text-black"
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
											classes="is-normal has-text-primary"
											target={$page.url.href.includes('event')
												? $page.url.href
												: $page.url.href.split('?')[0] + '/event/' + item.id}
										/>
									</p>

									{#if item.contact}
										<p class="control">
											<Contact
												classes="is-normal has-text-primary"
												mail={item.contact}
												currentEvent={item}
											/>
										</p>
									{/if}
								</span>
							</span>
						</div>
					</header>
					{#if item?.description}
						<div class="list-item-description">
							{@html item.description}
						</div>
					{/if}
				</div>

				<div class="list-item-controls" />
			</article>
		{/each}
	{/if}
</article>
