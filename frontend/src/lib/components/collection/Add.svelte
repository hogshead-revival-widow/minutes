<script lang="ts" context="module">
	import { setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { writable } from 'svelte/store';
	import Title from '$lib/components/basic/Title.svelte';
	import Field from '$lib/components/basic/form/Field.svelte';
	import Fa from 'svelte-fa';
	import { addCollection } from '$lib/actions/collection';
	import { addCollectionSchema, ICONS } from '$lib/config';
	import { createForm } from 'svelte-forms-lib';
	import { goto } from '$app/navigation';
	import type { CollectionCreate } from '$lib/api/data-contracts';
</script>

<script lang="ts">
	const key = 'AddCollection';
	const fields: (Field['$$prop_def'] & { name: keyof CollectionCreate })[] = [
		{
			type: 'text',
			label: 'Was ist passiert?',
			name: 'title',
			key
		}
	];

	const formProps = {
		initialValues: {
			title: ''
		},
		validationSchema: addCollectionSchema,
		onSubmit: async ({ title }: CollectionCreate) => {
			const { id } = await addCollection({ title });
			handleReset();
			goto(`/collection/${id}`);
		}
	};

	$: ({ handleSubmit, handleReset } = $formState);
	const formState = writable(createForm(formProps));
	setContext(key, formState);
</script>

<article class="boxed-content">
	<Title title="Neues Protokoll" />

	<form class="has-text-left" on:submit|preventDefault={handleSubmit} in:fade|local novalidate>
		{#each fields as field}
			<Field {...field} />
		{/each}

		<button
			class="button is-primary  mb-2 justify-center mt-4 is-fullwidth is-medium"
			type="submit"
		>
			<Fa {...ICONS['PLUS']} class="mr-2" />
			Erstellen
		</button>
	</form>
</article>
