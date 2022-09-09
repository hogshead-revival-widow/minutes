<script lang="ts" context="module">
	import { setContext, type ComponentProps } from 'svelte';
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { createForm } from 'svelte-forms-lib';
	import Field from '$lib/components/basic/form/Field.svelte';
	import type * as yup from 'yup';

	export type Fields<initialValues> = (Omit<ComponentProps<Field>, 'key'> & {
		name: keyof initialValues & string;
	})[];
</script>

<script lang="ts">
	type F = $$Generic;
	export let initialValues: F;
	export let fields: Fields<typeof initialValues>;
	export let validationSchema: yup.ObjectSchema<any>;
	export let afterSubmit: (
		values: typeof initialValues,
		currentInitialValues: typeof initialValues
	) => Promise<typeof initialValues>;

	export let showSubmit = true;
	export let canSubmit = false;
	export let resetAfterSuccess = true;

	let refreshed = {};
	const key = Symbol();

	const formProps = {
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			try {
				formProps.initialValues = await afterSubmit(values, initialValues);
				refreshed = {};
				if (resetAfterSuccess) handleReset();
				$formState = createForm(formProps);
			} catch (error) {
				console.error(error);
			}
		}
	};

	$: ({ handleSubmit, handleReset, isValid, isModified } = $formState);
	const formState = writable(createForm(formProps));
	setContext(key, formState);

	$: canSubmit = $isValid && $isModified;
</script>

{#key refreshed}
	<form class="has-text-left" on:submit|preventDefault={handleSubmit} in:fade|local novalidate>
		{#each fields as field, i (i)}
			<Field {key} name={field.name} {...field} />
		{/each}
		<slot name="fields" />
		{#key canSubmit}
			<div class="mt-2" class:is-invisible={!canSubmit} in:fade|local>
				{#if showSubmit}
					<button class="form-button" type="submit">Speichern</button>
				{/if}
				<slot />
			</div>
		{/key}
	</form>
{/key}
