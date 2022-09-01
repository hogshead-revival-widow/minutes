<script lang="ts" context="module">
	import type { ComponentProps } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Fa from 'svelte-fa';
	import type { EventRead, CollectionRead } from '$lib/api/data-contracts';
	import type { BoolKeys } from '$lib/utils';
	import type { Filter } from '$lib/actions/filter';
	import { updateEvent } from '$lib/actions/event';
</script>

<script lang="ts">
	export let currentEvent: EventRead;
	export let collection: Writable<CollectionRead>;
	export let timeline: Writable<EventRead[]>;
	export let activeFilters: Writable<Filter[]>;
	export let classes = 'is-primary is-medium';
	export let attribute: BoolKeys<EventRead> = 'isImportant';
	export let icon: ComponentProps<Fa>;
	export let message = { activate: '', deactivate: '' };

	const toggleAttribute = async (attribute: BoolKeys<EventRead>, value: boolean) => {
		currentEvent = await updateEvent({
			collection,
			timeline,
			currentEvent,
			update: { [attribute]: value },
			activeFilters
		});
	};

	const title = currentEvent.isFrozen
		? 'Ereignis gesperrt'
		: currentEvent[attribute]
		? message.deactivate
		: message.activate;
</script>

<button
	disabled={currentEvent.isFrozen}
	class="button {classes}"
	class:has-text-grey-light={!currentEvent[attribute]}
	on:click={async () => await toggleAttribute(attribute, !currentEvent[attribute])}
	{title}
>
	<Fa {...icon} />
</button>
