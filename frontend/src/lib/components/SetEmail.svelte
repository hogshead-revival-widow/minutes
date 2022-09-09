<script lang="ts" context="module">
	import Fa from 'svelte-fa';
	import { ICONS, contact } from '$lib/config';
	import { fade } from 'svelte/transition';
	import { addEmailSchema } from '$lib/config/validation';
	import { getContext, SvelteComponent } from 'svelte';
</script>

<script lang="ts">
	export let contactIsEmpty = $contact === '';
	export let proceedWith: undefined | { component: SvelteComponent; props: Record<string, any> } =
		undefined;
	export let closeOnSave: boolean = true;
	export let title = 'Email ändern';

	let email = $contact;

	let isValidEmail = false;
	$: {
		addEmailSchema.isValid({ email }).then((valid) => {
			isValidEmail = email === '' ? false : valid;
		});
	}
	// @ts-expect-error: Bug in svelte language tools
	const { open, close } = getContext('simple-modal');

	const saveMail = () => {
		$contact = email;
		close();
		if (proceedWith !== undefined) {
			open(proceedWith.component, proceedWith.props);
		}
	};

	$: canChange = isValidEmail && $contact !== email;
</script>

{#if !contactIsEmpty}
	<article class:boxed-content={!closeOnSave}>
		<h2 class="lead title has-text-centered block">{title}</h2>

		<div class="field mt-6 mb-4">
			<p class="control has-icons-left">
				<input class="input" type="email" placeholder="Email" bind:value={email} />
				<span class="icon is-small is-left">
					<Fa {...ICONS['EMAIL']} />
				</span>
			</p>
			{#if !isValidEmail}
				<p class="help is-danger" in:fade|local>Das ist keine gültige Email-Adresse.</p>
			{/if}
		</div>

		<p class="control has-icons-left mt-4">
			{#key canChange}
				<button
					in:fade|local
					class="form-button"
					class:is-invisible={!canChange}
					on:click={saveMail}
				>
					Speichern
				</button>
			{/key}
		</p>
	</article>
{:else}
	<article>
		<h2 class="lead title has-text-centered block">E-Mail hinterlegen</h2>

		<p>
			Bitte gib' deine Email-Adresse an. Sonst ist es leider nicht möglich, Ereignisse anzulegen.
		</p>

		<div class="field mt-4 mb-4">
			<p class="control has-icons-left">
				<input class="input" type="email" placeholder="Email" bind:value={email} />
				<span class="icon is-small is-left">
					<Fa {...ICONS['EMAIL']} />
				</span>
			</p>
		</div>

		<p>
			Sie wird
			<span class="lead">ausschließlich</span> dazu benutzt, dich als Expert:in für ein Ereignis zu hinterlegen,
			sodass Kolleg:innen gleich wissen, wen sie am besten dazu fragen.
		</p>

		{#if isValidEmail}
			<p class="control has-icons-left mt-4" class:is-invisible={!isValidEmail}>
				<button in:fade|local class="form-button" on:click={saveMail}> Speichern </button>
			</p>
		{/if}
	</article>
{/if}
