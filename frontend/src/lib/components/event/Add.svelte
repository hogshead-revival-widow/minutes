<script lang="ts" context="module">
	import { getContext, type ComponentProps } from 'svelte';
	import { type Writable, writable } from 'svelte/store';
	import Title from '$lib/components/basic/Title.svelte';
	import Form from '$lib/components/basic/form/Form.svelte';
	import More from '$lib/components/event/More/index.svelte';
	import { addEventSchema, contact } from '$lib/config';
	import { quickAddEvent } from '$lib/actions/event';
	import type { Filter } from '$lib/actions/filter';
	import type Field from '$lib/components/basic/form/Field.svelte';
	import type { CollectionRead, EventRead, EventCreate } from '$lib/api/data-contracts';
</script>

<script lang="ts">
	export let collection: Writable<CollectionRead>;
	export let timeline: Writable<EventRead[]>;
	export let activeFilters: Writable<Filter[]>;
	export let asModal = true;
	let closeAfterSubmit = false;
	let addDetailsAfterSubmit = false;
	// @ts-expect-error: Bug in svelte language tools
	const { close, open } = getContext('simple-modal');

	const initialValues: Pick<EventCreate, 'title' | 'contact' | 'date' | 'time' | 'description'> = {
		title: '',
		contact: $contact,
		date: '',
		time: '',
		description: ''
	};
	const fields: Omit<ComponentProps<Field> & { name: keyof typeof initialValues }, 'key'>[] = [
		{ type: 'text', name: 'title', label: "Kurz gesagt: Worum geht's?" },
		{ type: 'date', name: 'date', label: 'Wann ist es passiert?' },
		{ type: 'time', name: 'time', label: 'Und um wieviel Uhr?' },
		{ type: 'text', name: 'contact', label: 'Wen bei Rückfragen kontaktieren?' },
		{ type: 'editor', name: 'description', label: 'Gibt es mehr zu sagen oder Links?' }
	];

	const afterSubmit = async (values, currentInitialValues) => {
		values = Object.fromEntries(Object.entries(values).filter(([key, value]) => value !== ''));
		const addedEvent = await quickAddEvent({
			collection,
			timeline,
			activeFilters,
			values
		});
		if (asModal && closeAfterSubmit) close();
		if (addDetailsAfterSubmit) {
			close();
			open(More, {
				currentEvent: writable(addedEvent),
				collection,
				timeline,
				activeFilters,
				openTab: 'whoWhen',
				offerAddEvent: true,
				showFooter: false
			});
		}
		return currentInitialValues;
	};
</script>

<article>
	<Title title={'Neues Ereignis'} />

	<Form {initialValues} {fields} {afterSubmit} validationSchema={addEventSchema}>
		<button
			class="form-button mt-2 is-outlined"
			type="submit"
			on:click={() => {
				closeAfterSubmit = true;
				addDetailsAfterSubmit = true;
			}}
		>
			Speichern & Details hinzufügen
		</button>

		<button
			class="form-button mt-2 is-outlined"
			type="submit"
			on:click={() => (closeAfterSubmit = true)}
		>
			Speichern & schließen
		</button>
	</Form>
</article>