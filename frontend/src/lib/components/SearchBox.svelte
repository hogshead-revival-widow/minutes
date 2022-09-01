<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { onDestroy } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import Fuse from 'fuse.js';
	import Fa from 'svelte-fa';
	import SearchExplainer from '$lib/components/SearchExplainer.svelte';
	import { ICONS, SINGLE_SEARCHBOX_PER_PAGE_ID } from '$lib/config';
	import { page } from '$app/stores';
</script>

<script lang="ts">
	// @ts-expect-error: Bug in svelte lanuguage tools
	const { open } = getContext('simple-modal');

	export let disabled = false;
	type T = $$Generic;
	export let toSearch: T[];

	export let searchResult: Writable<T[]>;
	export let searchOptions: Fuse.IFuseOptions<T>;
	const initialQuery = $page.url.searchParams.get('query');
	let searchPattern = initialQuery ?? '';

	export let isSearching = false;
	export let placeholder = 'Titel oder Beschreibung durchsuchen...';
	export let matchCountBase: Writable<any[]> = searchResult;

	let timeoutID = undefined;

	$: isSearching = searchPattern.length >= 2;
	$: $searchResult = isSearching
		? new Fuse(toSearch, searchOptions).search(searchPattern).map((result) => result.item)
		: toSearch;
	$: hasExtendedSearch = searchOptions?.useExtendedSearch === true;

	const showExplainer = () => {
		open(SearchExplainer, { hasExtendedSearch });
	};

	onDestroy(() => clearTimeout(timeoutID));
</script>

<section class="boxed-content">
	<slot />
	{#if !disabled}
		<div class="control has-icons-left">
			<input
				id={SINGLE_SEARCHBOX_PER_PAGE_ID}
				class="input"
				type="text"
				{placeholder}
				bind:value={searchPattern}
			/>
			<span class="icon is-left">
				<Fa {...ICONS['SEARCH']} />
			</span>
		</div>

		<div class="level mt-1" class:is-invisible={$matchCountBase.length === toSearch.length}>
			<div class="level-left">
				<p class="mr-4">
					{#key $matchCountBase.length}
						<strong class="lead" in:fade|local>
							{$matchCountBase.length}
						</strong>
					{/key}&nbsp;Treffer
				</p>
				<button on:click={showExplainer} class="button is-ghost has-text-black p-0">
					<Fa {...ICONS['QUESTION']} />
				</button>
			</div>

			<div class="level-right">
				<slot name="searchInfo" />
			</div>
		</div>
	{/if}
</section>
