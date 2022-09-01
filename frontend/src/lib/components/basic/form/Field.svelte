<script lang="ts" context="module">
	import Fa from 'svelte-fa';
	import type { ComponentProps } from 'svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { createForm } from 'svelte-forms-lib';
</script>

<script lang="ts">
	import { editor } from '$lib/actions/editor';
	export let key: any;

	export let type: 'text' | 'date' | 'time' | 'textarea' | 'editor' | 'slotted' = 'text';
	export let disabled = false;

	const formState: Writable<ReturnType<typeof createForm>> = getContext(key);
	const { form, handleChange, errors } = $formState;

	export let icons: ComponentProps<Fa>[] = [];
	export let name: string;
	export let label: string = '';
	export let hint: string | undefined = undefined;

	const excludeKey = (obj: object) =>
		Object.fromEntries(Object.entries(obj).filter(([key, value]) => key !== 'key'));
</script>

{#if label !== ''}
	<label class="label mt-4" for={name}>
		{#each icons as icon}
			<span class="icon">
				<Fa {...icon} />
			</span>
		{/each}
		{label}
	</label>
{/if}
<div class="field">
	{#if typeof hint === 'string'}
		<p class="help mb-2">{hint}</p>
	{/if}
	{#if type === 'slotted'}
		<slot />
	{/if}
	{#if type === 'editor'}
		{#if disabled}
			<div
				class:is-danger={$errors[name] !== ''}
				use:editor={{ initialValue: $form[name], disabled }}
			/>
		{:else}
			<div
				class:is-danger={$errors[name] !== ''}
				use:editor={{ initialValue: $form[name], disabled }}
				on:textChange={(event) => {
					$form[name] = event.detail.text.trim() === '' ? '' : event.detail.html;
				}}
			/>
		{/if}
	{/if}
	{#if type === 'textarea'}
		<textarea
			{name}
			class="textarea"
			value={$form[name]}
			class:is-danger={$errors[name] !== ''}
			on:change={handleChange}
			on:blur={handleChange}
			{...excludeKey($$props)}
		/>
	{:else if type === 'text'}
		<input
			{name}
			type="text"
			class="input"
			class:is-danger={$errors[name] !== ''}
			value={$form[name]}
			on:change={handleChange}
			on:blur={handleChange}
			{...excludeKey($$props)}
		/>
	{:else if type === 'date'}
		<input
			{name}
			type="date"
			class="input"
			class:is-danger={$errors[name] !== ''}
			value={$form[name]}
			on:change={handleChange}
			on:blur={handleChange}
			{...excludeKey($$props)}
		/>
	{:else if type === 'time'}
		<input
			{name}
			type="time"
			class="input"
			class:is-danger={$errors[name] !== ''}
			value={$form[name]}
			on:change={handleChange}
			on:blur={handleChange}
			{...excludeKey($$props)}
		/>
	{/if}

	<p class="help mb-2 form-error" class:is-invisible={$errors[name] === ''}>{$errors[name]}</p>
</div>