<script lang="ts" context="module">
	import type { ComponentProps } from 'svelte';
	import { setContext, getContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { createForm } from 'svelte-forms-lib';
	import type { CollectionRead, CollectionUpdate } from '$lib/api/data-contracts';
	import Title from '../basic/Title.svelte';
	import Field from '../basic/form/Field.svelte';
	import { updateCollection } from '$lib/actions/collection';
	import { updateCollectionSchema } from '$lib/config';
</script>

<script lang="ts">
	export let collection: Writable<CollectionRead>;
	export let asModal = true;

	// @ts-expect-error: Bug in svelte language tools
	const { close } = getContext('simple-modal');

	const key = 'ChangeTitle';
	const fields: (ComponentProps<Field> & { name: keyof CollectionUpdate })[] = [
		{ type: 'text', name: 'title', key }
	];

	const formProps = {
		initialValues: {
			title: $collection.title
		},
		validationSchema: updateCollectionSchema,
		onSubmit: async ({ title }: CollectionUpdate) => {
			const { id } = await updateCollection(collection, { title });

			if (asModal) close();
		}
	};

	$: ({ handleSubmit } = $formState);
	const formState = writable(createForm(formProps));
	setContext(key, formState);
</script>

<article>
	<Title title="Protokoll-Titel ändern" />

	<form class="has-text-left" on:submit|preventDefault={handleSubmit} in:fade|local novalidate>
		{#each fields as field}
			<Field {...field} />
		{/each}

		<button
			class="button is-primary  mb-2 justify-center mt-4 is-fullwidth is-medium"
			type="submit"
		>
			Ändern
		</button>
	</form>
</article>
