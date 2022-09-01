<script lang="ts" context="module">
	import { fade, fly } from 'svelte/transition';
	import type { Writable } from 'svelte/store';
	import Fa from 'svelte-fa';
	import { ICONS } from '$lib/config';
	import Dropdown from '$lib/components/basic/Dropdown.svelte';
	import { getContextStore } from '$lib/actions/context';
	import { getFilters } from '$lib/actions/filter';
</script>

<script lang="ts">
	type T = $$Generic;
	export let disabled = false;
	export let toFilter: T[];
	export let filterResult: Writable<T[]>;
	export let isFiltering = false;
	const options = getContextStore('options');
	const { activeFilters } = $options;

	const removeFilter = (id: string) =>
		($activeFilters = $activeFilters.filter((filter) => filter.id !== id));

	$: isFiltering = !disabled && $activeFilters.length > 0 && toFilter.length > 0;
	$: {
		$filterResult = isFiltering ? toFilter.filter(getFilters($activeFilters)) : toFilter;
	}
</script>

{#if $activeFilters.length > 2}
	<Dropdown isHoverable={true}>
		<h2 slot="trigger">
			<strong class="lead">{$activeFilters.length}</strong>&nbsp;aktive Filter
		</h2>
		{#each $activeFilters as filter, i (filter.id)}
			<button
				class="button has-text-danger-hover is-ghost is-normal  has-text-grey-dark"
				on:click={() => removeFilter(filter.id)}
				transition:fade|local
			>
				<Fa {...ICONS['FILTER']} class="mr-1 lead" />
				{@html filter.label}
			</button>
		{/each}
	</Dropdown>
{:else}
	<div class="buttons">
		{#each $activeFilters as filter, i (filter.id)}
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a
				href=""
				class="has-text-danger-hover is-ghost has-text-grey-dark fit-text"
				class:mr-2={i !== $activeFilters.length - 1}
				on:click|preventDefault={() => removeFilter(filter.id)}
				transition:fly|local
			>
				<Fa {...ICONS['FILTER']} class="mr-1 lead" />
				{@html filter.label}
			</a>
		{/each}
	</div>
{/if}
