<script lang="ts" context="module">
	import AutoComplete from 'simple-svelte-autocomplete';
	import Fa from 'svelte-fa';
	import {
		EntityType,
		type AnyEntity,
		type CollectionRead,
		type EntityRead,
		type EventRead
	} from '$lib/api/data-contracts';
	import { ICONS } from '$lib/config';
	import { updateEvent } from '$lib/actions/event';
	import { isEventRead } from '$lib/utils';
	import { Minutes } from '$lib/api';
	import { fade, fly } from 'svelte/transition';
	import { createForm } from 'svelte-forms-lib';
	import type { Writable } from 'svelte/store';
	import type { Filter } from '$lib/actions/filter';
</script>

<script lang="ts">
	export let currentEvent: Writable<EventRead>;
	export let collection: Writable<CollectionRead>;
	export let timeline: Writable<EventRead[]>;
	export let activeFilters: Writable<Filter[]>;

	const initialValues: Record<string, string[] | EntityRead[]> = Object.fromEntries(
		Object.values(EntityType).map((entityType) => {
			return [
				entityType,
				$currentEvent.entities.filter((entity) => entity.discriminator === entityType)
			];
		})
	);

	const handleUpdate = async (values: typeof initialValues) => {
		const entities = Object.values(values)
			.flat()
			.filter((entity) => isEventRead(entity))
			// @ts-ignore
			.map((entity) => entity.id);

		const update = { entities };
		try {
			$currentEvent = await updateEvent({
				collection,
				timeline,
				activeFilters,
				currentEvent: $currentEvent,
				update
			});

			formProps.initialValues = Object.fromEntries(
				Object.values(EntityType).map((entityType) => {
					return [
						entityType,
						$currentEvent.entities.filter((entity) => entity.discriminator === entityType)
					];
				})
			);
			({ form, errors, isModified, isValid, handleSubmit } = createForm(formProps));
		} catch (error) {
			console.error(error);
		}
	};
	const formProps = {
		initialValues,
		onSubmit: handleUpdate
	};
	let { form, errors, isModified, isValid, handleSubmit } = createForm(formProps);

	let entityFields = [
		{
			type: EntityType.PERSON,
			label: 'Wer ist beteiligt?',
			title: 'Person',
			placeholder: 'z.B. Oskar Müller'
		},
		{
			type: EntityType.LOCATION,
			label: 'Wo ist es passiert?',
			title: 'Ort',
			placeholder: 'z.B. Baden-Baden'
		},
		{
			type: EntityType.ORGANIZATION,
			title: 'Institution',
			label: 'Welche Institutionen sind beteiligt?',
			placeholder: 'z.B. Puddingwerke Offenbach/Main e.V.'
		}
	];

	const add = (name: string) => {
		// @ts-ignore
		$form[name] = $form[name].concat('');
		$errors[name] = $errors[name].concat('');
	};

	const remove = (name, i) => {
		// @ts-ignore
		$form[name] = $form[name].filter((_, index) => index !== i);
		// @ts-expect-error
		$errors[name] = $errors[name].filter((_, index) => index !== i);
	};

	const create = async (text, entityField) => {
		const newEntity: AnyEntity = { discriminator: entityField.type, name: text };
		return Minutes.createEntity(newEntity);
	};

	$: somethingAdded =
		$form !== initialValues &&
		Object.values($form).every(
			(entities) => entities.length === 0 || entities.some((value) => value !== '')
		);
	$: canSubmit = !$currentEvent.isFrozen && $isValid && $isModified && somethingAdded;
</script>

{#if !$currentEvent.isFrozen}
	<form on:submit|preventDefault={handleSubmit} in:fade|local novalidate>
		<div class="field has-addons is-justify-content-flex-end">
			{#each entityFields as entityField (entityField.type)}
				{#if !$currentEvent.isFrozen && $form[entityField.type].length === 0}
					<p class="control">
						<button
							transition:fade|local
							title={`${entityField.title} verknüpfen`}
							class="form-button  is-normal is-justify-content-flex-start is-outlined"
							on:click|preventDefault={() => add(entityField.type)}
						>
							<span class="icon">
								<Fa {...ICONS['PLUS']} class="mx-1" />
							</span>
							<span class="icon">
								<Fa {...ICONS[entityField.type]} />
							</span>
							<span>
								{entityField.title}
							</span>
						</button>
					</p>
				{/if}
			{/each}
		</div>

		{#each entityFields as entityField (entityField.type)}
			<div class="field block">
				{#each $form[entityField.type] as _, i (i)}
					{#if i == 0}
						<label class="label" for={`${entityField.type}`}>
							<span class="icon">
								<Fa {...ICONS[entityField.type]} />
							</span>
							{entityField.label}
						</label>
					{/if}
					<div class="field has-addons" out:fly|local>
						<p class="control force-fullwidth">
							<AutoComplete
								hideArrow={true}
								inputId={`add-${entityField.type}-${i}`}
								inputClassName="is-size-7"
								dropdownClassName={$form[entityField.type][i] == '' ? '' : 'is-invisible'}
								readonly={$form[entityField.type][i] !== ''}
								searchFunction={async (name) =>
									await Minutes.searchEntities({
										name: name,
										discriminator: entityField.type
									})}
								name={`${entityField.type}[${i}]`}
								bind:selectedItem={$form[entityField.type][i]}
								placeholder={entityField.placeholder}
								matchAllKeywords={true}
								create={true}
								noResultsText={''}
								createText={'Nicht gefunden: Zum Anlegen "Enter" drücken oder hier klicken.'}
								labelFieldName="name"
								valueFieldName="id"
								delay="200"
								onCreate={(text) => create(text, entityField)}
								disabled={$currentEvent.isFrozen}
								drop
							/>
						</p>

						<p class="control">
							<button
								in:fade|local
								class="button is-primary is-outlined "
								on:click|preventDefault={() => add(entityField.type)}
								disabled={$currentEvent.isFrozen}
							>
								<Fa {...ICONS['PLUS']} />
							</button>
						</p>
						<p class="control">
							<button
								in:fade|local
								class="button is-danger is-outlined"
								on:click|preventDefault={() => remove(entityField.type, i)}
								disabled={$currentEvent.isFrozen}
							>
								<Fa {...ICONS['DELETE']} />
							</button>
						</p>
					</div>
				{/each}
			</div>
		{/each}

		{#key canSubmit}
			<button class:is-invisible={!canSubmit} in:fade type="submit" class="block  form-button">
				Speichern
			</button>
		{/key}
	</form>
{/if}

{#if $currentEvent.entities.length === 0 && !canSubmit}
	<p out:fade|local>
		Diesem Ereignis sind noch keine Personen, Orte oder Institutionen zugeordnet. Klicke auf z.B.
		den Person-Knopf oben, um eine für dieses Ereignis wichtige Person zu hinterlegen.
	</p>
{/if}
