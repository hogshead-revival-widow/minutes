<script lang="ts" context="module">
	import Fa from 'svelte-fa';
	import { ICONS, OFFER_TEAMS_FOR_DOMAINS } from '$lib/config';
	import Dropdown from '$lib/components/basic/Dropdown.svelte';
	import { page } from '$app/stores';
	import { getDomain } from '$lib/utils';
	import type { Writable } from 'svelte/store';
	import type { EventRead } from '$lib/api/data-contracts';
</script>

<script lang="ts">
	export let currentEvent: EventRead;
	export let classes = 'sticky-menu-button';
	export let mail: string;
	export let isUp = true;
	export let isRight = true;
	let isActive = false;

	const title = `Ereignis-Expert:in ${mail}`;

	$: mailTemplate = `subject=Frage zu Ereignis "${
		currentEvent.title
	}"&body=Hallo, ich habe eine Frage zum Ereignis "${currentEvent.title}" (Link: ${
		$page.url.href.includes('event')
			? $page.url.href
			: $page.url.href.split('?')[0] + `/event/${currentEvent.id}`
	}).`;
</script>

<Dropdown {isUp} {isRight} bind:isActive {title}>
	<button class="button {classes}" slot="trigger" title="Ereignis-Expert:in kontaktieren">
		<span class="icon"><Fa {...ICONS['CONTACT']} /></span>
	</button>

	<div style="min-width: 20em;" class="buttons">
		{#if OFFER_TEAMS_FOR_DOMAINS.includes(getDomain(mail))}
			<a class="button is-fullwidth is-primary is-outlined" href="sip:{mail}">
				<span class="icon is-pulled-left">
					<Fa {...ICONS['TEAMS']} />
				</span>
				<span>in Teams kontaktieren</span>
			</a>
		{/if}

		<a class="button is-fullwidth is-primary is-outlined" href="mailto:{mail}?{mailTemplate}">
			<span class="icon is-pulled-right">
				<Fa {...ICONS['EMAIL']} />
			</span>
			<span>Email schreiben</span>
		</a>
	</div>
</Dropdown>
