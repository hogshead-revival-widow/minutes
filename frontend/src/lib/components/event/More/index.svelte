<script lang="ts">
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import Contact from '$lib/components/event/More/Contact.svelte';
	import Share from '$lib/components/Share.svelte';
	import CoreData from '$lib/components/event/More/CoreData.svelte';
	import Connections from '$lib/components/event/More/Connections/index.svelte';
	import Entities from '$lib/components/event/More/Entities.svelte';
	import Title from '$lib/components/basic/Title.svelte';
	import Toggle from '$lib/components/event/Toggle.svelte';
	import Add from '$lib/components/event/Add.svelte';
	import Delete from '$lib/components/event/Delete.svelte';
	import Fa from 'svelte-fa';
	import { ICONS } from '$lib/config';
	import type { CollectionRead, EventRead } from '$lib/api/data-contracts';
	import type { Filter } from '$lib/actions/filter';
	import type { Writable } from 'svelte/store';

	const tabs = {
		coreData: { label: 'Was & wann?', isActive: false, component: CoreData },
		whoWhen: { label: 'Wer & wo?', isActive: false, component: Entities },
		links: { label: 'Verknüpfungen', isActive: false, component: Connections }
	};

	// @ts-expect-error: Bug in svelte language tools
	const { close, open } = getContext('simple-modal');

	export let currentEvent: Writable<EventRead>;
	export let collection: Writable<CollectionRead>;
	export let timeline: Writable<EventRead[]>;
	export let activeFilters: Writable<Filter[]>;
	export let asModal: boolean = true;
	export let openTab: keyof typeof tabs = 'coreData';
	export let offerAddEvent = false;
	export let showFooter = true;

	tabs[openTab].isActive = true;

	const setActiveTab = (id: string) => {
		tabs[id].isActive = true;

		Object.keys(tabs)
			.filter((tabId) => tabId !== id)
			.forEach((tabId) => {
				tabs[tabId].isActive = false;
			});
	};
</script>

<article>
	<header class="has-text-centered" class:boxed-content={!asModal}>
		{#if asModal}
			<h2 class="lead m-0 p-0">{$currentEvent.title}</h2>
		{:else}
			<Title title={$currentEvent.title} />
		{/if}

		<nav class="tabs is-fullwidth mt-4 mb-4" class:has-background-white={!asModal}>
			<ul class="p-0 m-0">
				{#each Object.entries(tabs) as [id, tab] (id)}
					<li class:is-active={tab.isActive} class="is-size-5">
						<!-- svelte-ignore a11y-invalid-attribute -->
						<a href="" on:click={() => setActiveTab(id)} title={tab.label}>
							{tab.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</header>

	{#if $currentEvent.isFrozen}
		<aside class="notification mr-4" class:ml-4={!asModal} in:fade>
			<p><Fa {...ICONS.FROZEN} class="has-text-danger" /> Dieses Ereignis ist gesperrt.</p>
			<p>
				<!--todo: implement-->
				<a href="mailto:tbi">Bitte die Ereignis-Expert:in um Entsperrung</a>
				oder gib <a href="#tbi">hier den Entsperr-Code ein</a>, um Änderungen vorzunehmen.
			</p>
		</aside>
	{/if}

	{#each Object.values(tabs) as tab}
		{#if tab.isActive}
			<div in:fade class="mt-3" class:boxed-content={!asModal}>
				<svelte:component
					this={tab.component}
					{currentEvent}
					{collection}
					{timeline}
					{activeFilters}
				/>
			</div>
		{/if}
	{/each}

	{#if showFooter}
		<footer class="is-justify-content-space-between is-flex mt-6" class:boxed-content={!asModal}>
			{#if !asModal}
				<div class="has-text-centered">
					<a
						href="/collection/{$collection.id}"
						class="button is-primary is-outlined is-medium"
						sveltekit:prefetch
						title="Zum Protokoll wechseln"
					>
						<span class="icon is-small ">
							<Fa {...ICONS['GOTO']} />
						</span>
						<span>Protokoll</span>
					</a>
				</div>
			{/if}

			<div class="field has-addons" class:is-invisible={$currentEvent.isFrozen}>
				<p class="control">
					<Delete currentEvent={$currentEvent} {collection} {timeline} {activeFilters} />
				</p>
			</div>

			<div class="field has-addons">
				<p class="control">
					<Toggle
						attribute="isImportant"
						classes="is-medium has-text-black"
						message={{
							activate: 'Als wichtig markieren',
							deactivate: 'Als unwichtig markieren'
						}}
						bind:currentEvent={$currentEvent}
						{collection}
						{timeline}
						{activeFilters}
						icon={ICONS['IMPORTANT']}
					/>
				</p>
				<p class="control">
					<Toggle
						attribute="isConfirmed"
						classes="is-medium has-text-black"
						message={{
							activate: 'Als geprüft markieren',
							deactivate: 'Als ungeprüft markieren'
						}}
						bind:currentEvent={$currentEvent}
						{collection}
						{timeline}
						{activeFilters}
						icon={ICONS['CONFIRMED']}
					/>
				</p>

				<p class="control">
					<Contact
						mail={$currentEvent.contact}
						classes="is-medium has-text-primary "
						currentEvent={$currentEvent}
					/>
				</p>

				<p class="control">
					<Share
						title="Link zu diesem Ereignis kopieren"
						classes="is-medium has-text-primary"
						target={$page.url.href.includes('event')
							? $page.url.href
							: $page.url.href.split('?')[0] + '/event/' + $currentEvent.id}
						isRight={true}
					/>
				</p>
			</div>
		</footer>
	{/if}
	{#if offerAddEvent}
		<button
			class="form-button mt-6 is-outlined"
			on:click={() => {
				close();
				open(Add, { collection, timeline, activeFilters });
			}}
		>
			Weiteres Ereignis hinzufügen
		</button>
	{/if}
</article>
