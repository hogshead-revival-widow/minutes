<script lang="ts" context="module">
	import { writable, type Writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import SearchBox from '../SearchBox.svelte';
	import DateTime from '$lib/components/basic/datetime/DateTime.svelte';
	import Title from '$lib/components/basic/Title.svelte';
	import Fa from 'svelte-fa';
	import { ICONS, LOG_COLLECTION_DATE_FORMAT } from '$lib/config';
	import type { CollectionSimpleRead } from '$lib/api/data-contracts';
</script>

<script lang="ts">
	export let collectionsRead: CollectionSimpleRead[] = [];
	export let showMax = 3;
	const incrementBy = showMax;
	let searchedCollections: Writable<CollectionSimpleRead[]> = writable([]);
	let hasMore = false;
	let isSearching = false;
	const searchOptions = { keys: ['title', 'description'] };
	$: slicedCollections = $searchedCollections.slice(0, showMax);
	$: hasMore = $searchedCollections.length > showMax;
</script>

<section class="container">
	<article class="list has-visible-pointer-controls">
		<SearchBox
			toSearch={collectionsRead}
			bind:isSearching
			{searchOptions}
			searchResult={searchedCollections}
			placeholder="Nach Protokoll suchen..."
		>
			<Title title="Alle Protokolle" />
		</SearchBox>

		{#if slicedCollections.length === 0}
			<article class="list-item box" in:fade|local>
				<div class="list-item-image">
					<span class="list-item-icon">😔</span>
				</div>
				<div class="list-item-title lead">
					{#if isSearching}
						Leider nichts passendes gefunden. <span class="is-size-3" />
					{:else}
						Keine Protokolle gefunden.
					{/if}
				</div>
			</article>
		{/if}
		{#each slicedCollections as collectionRead, i ((collectionRead.id, i))}
			<article class="list-item box ">
				<div class="list-item-image">
					<a
						class="list-item-icon has-text-primary"
						href="collection/{collectionRead.id}"
						sveltekit:prefetch
					>
						<span class="icon has-text-primary">
							<Fa {...ICONS['PROTOCOL']} />
						</span>
					</a>
				</div>

				<div class="list-item-content">
					<a href="collection/{collectionRead.id}" class="has-text-black" sveltekit:prefetch>
						<header>
							<div class="list-item-title lead">
								{collectionRead.title}
							</div>
							<div class="list-item-description">
								<DateTime
									datetime={collectionRead.datetime}
									dateFormat={LOG_COLLECTION_DATE_FORMAT}
								/>
							</div>
						</header>
					</a>
				</div>

				<div class="list-item-controls">
					<div class="buttons is-down">
						<a
							href="/collection/{collectionRead.id}"
							class="button is-primary is-outlined is-medium"
							sveltekit:prefetch
						>
							<span class="icon is-small ">
								<Fa {...ICONS['GOTO']} />
							</span>
							<span>Protokoll</span>
						</a>
					</div>
				</div>
			</article>
		{/each}

		{#if hasMore}
			<button
				out:fade|local
				class="button box is-primary is-outlined is-fullwidth"
				on:click={() => (showMax = showMax + incrementBy)}
			>
				Mehr anzeigen
			</button>
		{/if}

		<slot />
	</article>
</section>
