<script lang="ts">
	import AutoComplete from 'simple-svelte-autocomplete';
	import Fa from 'svelte-fa';
	import { EntityType } from '$lib/api/data-contracts';
	import { ICONS } from '$lib/config';
	import { Minutes } from '$lib/api';
	import type { Writable } from 'svelte/store';
	import { fade } from 'svelte/transition';

	export let form: Writable<unknown>;
	export let name: string;

	const entityFields = [
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

	let discriminator = undefined;
	const create = (name) => {
		const newEntity = { discriminator, name };
		return Minutes.createEntity(newEntity);
	};

	$: showEntities = $form[name].reduce(
		(acc, entity) => (acc.map((v) => v.id).includes(entity.id) ? acc : [...acc, entity]),
		[]
	);
	let selected = undefined;
</script>

{#if $form[name].length > 0}
	<div class="tags block">
		{#each showEntities as selectedEntity (selectedEntity.id)}
			<span class="tag is-medium" transition:fade|local>
				<span class="icon">
					<Fa {...ICONS[selectedEntity.discriminator]} />
				</span>
				{selectedEntity.name}
				<button
					class="delete is-small"
					on:click|preventDefault={() => {
						$form[name] = $form[name].filter((entity) => entity.id !== selectedEntity.id);
					}}
				/>
			</span>
		{/each}
	</div>
{/if}

<div class="field has-addons ">
	<p class="control">
		<span class="select">
			<select bind:value={selected}>
				<option value={undefined}>Alle</option>
				{#each entityFields as entityField}
					<option value={entityField.type}>{entityField.title}</option>
				{/each}
			</select>
		</span>
	</p>
	<p class="control" style="width: 100%;">
		<AutoComplete
			showClear={false}
			multiple={true}
			hideArrow={true}
			inputId="add-{name}"
			inputClassName="is-size-7"
			searchFunction={async (name) => {
				const search = { name, discriminator: selected };
				return await Minutes.searchEntities(search);
			}}
			bind:selectedItem={$form[name]}
			placeholder={'Hinzufügen...'}
			matchAllKeywords={true}
			createText={'Nicht gefunden: Zum Anlegen "Enter" drücken oder hier klicken.'}
			labelFieldName="name"
			valueFieldName="id"
			delay="200"
			create={true}
			onCreate={create}
			maxItemsToShowInList={3}
			{...$$props}
		>
			<div slot="menu-header" let:nbItems let:maxItemsToShowInList>
				alternativ
				{#each entityFields as entityField, i}
					<a href="" on:click|preventDefault={() => (discriminator = entityField.type)}>
						<span class="icon">
							<Fa {...ICONS[entityField.type]} />
						</span>
						<span>
							{entityField.title}
						</span>
					</a>
					{#if i !== entityFields.length - 1}&nbsp; / &nbsp; {/if}
				{/each}
				hinzufügen?
				{#if nbItems > 0}
					({nbItems} ausgeblendet)
				{/if}
			</div>

			<p slot="create" let:createText>
				Nicht gefunden.
				{#if selected !== undefined}
					Zum Hinzufügen als

					<a href="" on:click|preventDefault={() => (discriminator = selected)}>
						<span class="icon">
							<Fa {...ICONS[selected]} />
						</span>
						<span>
							{entityFields.find((field) => field.type === selected).title}
						</span>
					</a>
					klicken.
				{:else}
					Als
					{#each entityFields as entityField, i}
						<a href="" on:click|preventDefault={() => (discriminator = entityField.type)}>
							<span class="icon">
								<Fa {...ICONS[entityField.type]} />
							</span>
							<span>
								{entityField.title}
							</span>
						</a>
						{#if i !== entityFields.length - 1}&nbsp; / &nbsp; {/if}
					{/each}
					hinzufügen?
				{/if}
			</p>

			<div slot="tag" />

			<div slot="item" let:item let:label>
				<span class="icon">
					<Fa {...ICONS[item.discriminator]} />
				</span>
				{item.name}
			</div>
		</AutoComplete>
	</p>
</div>
