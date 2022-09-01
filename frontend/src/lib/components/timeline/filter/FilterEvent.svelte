<script lang="ts" context="module">
	import { fade } from 'svelte/transition';
	import Dropdown from '$lib/components/basic/Dropdown.svelte';
	import Fa from 'svelte-fa';
	import FilterEntity from '$lib/components/timeline/filter/FilterEntity.svelte';
	import { ICONS } from '$lib/config';
	import {
		hasAttachmentFilter,
		hasDescriptionFilter,
		isConfirmedFilter,
		isImportantFilter
	} from '$lib/actions/filter';
	import { getContextStore } from '$lib/actions/context';
</script>

<script lang="ts">
	export const classes = 'sticky-menu-button is-outlined';
	let isActive = false;
	const options = getContextStore('options');
	const activeFilters = $options.activeFilters;
	const filters = [isImportantFilter, isConfirmedFilter, hasAttachmentFilter, hasDescriptionFilter];
	const toggleFilter = (filter: typeof filters[number]) => {
		const filterActive = $activeFilters.find((activeFilter) => activeFilter.id === filter.id);
		if (!filterActive) return ($activeFilters = [...$activeFilters, filter]);
		return ($activeFilters = $activeFilters.filter(
			(activeFilter) => activeFilter.id !== filter.id
		));
	};
</script>

<Dropdown title="Filtern" bind:isActive isUp={true}>
	<button slot="trigger" class={classes} title="Protokoll filtern" in:fade>
		<span class="icon"><Fa {...ICONS['FILTER']} /></span>
	</button>

	<ul class="filter-menu">
		<FilterEntity />
		{#each filters as filter, i (filter.id)}
			<li>
				<button
					in:fade|local
					class="filter-button"
					title="Ereignisse ausschließen, die Kriterium nicht erfüllen"
					on:click={() => toggleFilter(filter)}
					class:is-primary={$activeFilters.find(
						(activeFilter) => activeFilter.label === filter.label
					)}
				>
					<span class="icon mr-2 mr-auto">
						<Fa {...ICONS[filter.iconKey]} />
					</span>
					{filter.label}
				</button>
			</li>
		{/each}
	</ul>
</Dropdown>
