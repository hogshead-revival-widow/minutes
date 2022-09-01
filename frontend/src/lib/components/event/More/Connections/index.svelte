<script lang="ts" context="module">
	import Attachments from '$lib/components/event/More/Connections/Attachments.svelte';
	import ReferencedEvents from '$lib/components/event/More/Connections/ReferencedEvents.svelte';
	import Links from '$lib/components/event/More/Connections/Links.svelte';
	import Fa from 'svelte-fa';
	import { fade } from 'svelte/transition';
	import { ICONS } from '$lib/config';
	import type { Writable } from 'svelte/store';
	import type { EventRead, CollectionRead } from '$lib/api/data-contracts';
	import type { Filter } from '$lib/actions/filter';
	import type { SvelteComponent } from 'svelte';
</script>

<script lang="ts">
	export let currentEvent: Writable<EventRead>;
	export let collection: Writable<CollectionRead>;
	export let timeline: Writable<EventRead[]>;
	export let activeFilters: Writable<Filter[]>;

	const tabs: Record<
		'REFERENCE' | 'ATTACHMENT' | 'REFERENCED_EVENT',
		{ component: typeof SvelteComponent; label: string }
	> = {
		REFERENCE: { component: Links, label: 'Links' },
		ATTACHMENT: { component: Attachments, label: 'Anhänge' },
		REFERENCED_EVENT: { component: ReferencedEvents, label: 'Ereignisse' }
	};
	let currentTab = 'REFERENCE';
</script>

<nav class="field has-addons is-justify-content-flex-end">
	{#each Object.keys(tabs) as tab}
		<p class="control">
			<button
				class:is-outlined={currentTab !== tab}
				class="form-button  is-normal is-justify-content-flex-start"
				on:click={() => (currentTab = tab)}
			>
				{#if tab !== 'REFERENCE'}
					<span class="icon">
						<Fa {...ICONS['PLUS']} class="mx-1" />
					</span>
				{/if}
				<span class="icon">
					<Fa {...ICONS[tab]} />
				</span>
				<span>
					{tabs[tab].label}
				</span>
			</button>
		</p>
	{/each}
</nav>

{#key currentTab}
	<article in:fade|local class="mt-2">
		<svelte:component
			this={tabs[currentTab].component}
			{currentEvent}
			{collection}
			{timeline}
			{activeFilters}
		/>
	</article>
{/key}
