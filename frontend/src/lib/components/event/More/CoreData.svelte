<script lang="ts" context="module">
	import type { ComponentProps } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Form from '$lib/components/basic/form/Form.svelte';
	import { updateEvent } from '$lib/actions/event';
	import { updateEventSchema } from '$lib/config';
	import type { CollectionRead, EventRead } from '$lib/api/data-contracts';
	import type Field from '$lib/components/basic/form/Field.svelte';
	import type { Filter } from '$lib/actions/filter';

	const fields: Omit<ComponentProps<Field> & { name: keyof EventRead }, 'key'>[] = [
		{
			type: 'text',
			label: 'Was ist passiert?',
			name: 'title'
		},
		{
			type: 'text',
			label: 'Wen im Haus bei Rückfragen kontaktieren?',
			name: 'contact'
		},
		{
			type: 'date',
			label: 'Wann ist es passiert?',
			name: 'date'
		},
		{
			type: 'time',
			label: 'Und um wieviel Uhr?',
			name: 'time'
		},
		{
			type: 'editor',
			label: 'Gibt es mehr zu sagen oder Links?',
			name: 'description'
		}
	];
</script>

<script lang="ts">
	export let currentEvent: Writable<EventRead>;
	export let collection: Writable<CollectionRead>;
	export let timeline: Writable<EventRead[]>;
	export let activeFilters: Writable<Filter[]>;

	let initialValues = Object.fromEntries(
		fields.map((field) => [field.name, $currentEvent[field.name]])
	);

	const handleUpdate = async (
		values: typeof initialValues,
		currentInitialValues: typeof initialValues
	) => {
		if (typeof values.description === 'string') {
			values.description = values.description.trim();
			if (values.description.length === 0) values.description = null;
		}
		if (typeof values.time === 'string' && values.time.length === 0) {
			values.time = null;
		}

		try {
			$currentEvent = await updateEvent({
				collection,
				timeline,
				activeFilters,
				currentEvent: $currentEvent,
				update: values
			});
			initialValues = Object.fromEntries(
				fields.map((field) => [field.name, $currentEvent[field.name]])
			);

			return initialValues;
		} catch (error) {
			console.error(error);
		}
	};
</script>

<Form {initialValues} {fields} validationSchema={updateEventSchema} afterSubmit={handleUpdate} />
