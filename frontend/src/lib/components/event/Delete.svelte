<script lang="ts">
	import type { EventRead, CollectionRead } from '$lib/api/data-contracts';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { Filter } from '$lib/actions/filter';
	import Fa from 'svelte-fa';
	import Dropdown from '$lib/components/basic/Dropdown.svelte';
	import { deleteEvent } from '$lib/actions/event';
	import { ICONS } from '$lib/config';

	export let currentEvent: EventRead;
	export let collection: Writable<CollectionRead>;
	export let timeline: Writable<EventRead[]>;
	export let activeFilters: Writable<Filter[]>;
	export let classes: string = 'is-danger is-outlined is-medium';

	// @ts-expect-error: Bug in svelte language tools
	const { close } = getContext('simple-modal');

	const handleDelete = async (currentEvent: EventRead) => {
		try {
			currentEvent = await deleteEvent({
				collection,
				timeline,
				currentEvent,
				activeFilters
			});
			close();
		} catch (error) {
			console.error(error);
		}
	};
</script>

<Dropdown title="Sicher?" isUp={true}>
	<button
		disabled={currentEvent.isFrozen}
		class="button {classes}"
		slot="trigger"
		title="Ereignis löschen"
	>
		<Fa {...ICONS['DELETE']} />
	</button>

	<button
		class="button is-fullwidth is-danger is-outlined"
		on:click={() => handleDelete(currentEvent)}
	>
		<span class="icon is-pulled-right">
			<Fa {...ICONS['DELETE']} />
		</span>
		<span>Ereignis endgültig löschen</span>
	</button>
</Dropdown>
