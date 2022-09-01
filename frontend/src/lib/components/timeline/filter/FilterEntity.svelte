<script lang="ts" context="module">
	import type { EntityRead } from '$lib/api/data-contracts';
	import AutoComplete from 'simple-svelte-autocomplete';
	import Fa from 'svelte-fa';
	import { ICONS } from '$lib/config';
	import { getContextStore } from '$lib/actions/context';
	import { fade } from 'svelte/transition';
	import { makeEntityFilter } from '$lib/actions/filter';
</script>

<script lang="ts">
	let selectedItem: EntityRead = undefined;
	const collection = getContextStore('collection');
	const options = getContextStore('options');
	const activeFilters = $options.activeFilters;
	let hasEntities = false;

	const remove = (filterForEntity: EntityRead) => {
		$activeFilters = $activeFilters.filter((filter) => filter.id !== filterForEntity.id);
	};

	$: hasEntities = $collection.events.some((event) => event.entities.length > 0);

	$: if (selectedItem) {
		$activeFilters = [makeEntityFilter(selectedItem), ...$activeFilters];
		selectedItem = undefined;
	}
</script>

{#if hasEntities}
	<li class="block">
		<AutoComplete
			inputId={'filter-entity'}
			items={$collection.events.flatMap((event) =>
				event.entities.filter(
					(collectionEntity) =>
						!$activeFilters.map((filter) => filter.id).includes(collectionEntity.id)
				)
			)}
			name={'filter-entity'}
			bind:selectedItem
			placeholder={'Person, Ort, Institution filtern'}
			noResultsText={'Unbekannt, diese Entität kommt im Protokoll nicht vor'}
			labelFieldName="name"
			moreItemsText={''}
			maxItemsToShowInList={5}
		/>
	</li>

	{#each $activeFilters.filter((filter) => filter?.entity) as activeFilter (activeFilter.id)}
		<li>
			<button
				in:fade|local
				class="filter-button is-primary"
				title="Ereignisse ausschließen, die Kriterium nicht erfüllen"
				on:click={() => remove(activeFilter)}
			>
				<span class="icon mr-auto">
					<Fa {...ICONS[activeFilter.entity.discriminator]} />
				</span>

				{activeFilter.label}
			</button>
		</li>
	{/each}
{/if}
