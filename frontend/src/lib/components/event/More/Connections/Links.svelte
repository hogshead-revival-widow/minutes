<script lang="ts" context="module">
	import type { Writable } from 'svelte/store';
	import type { EventRead } from '$lib/api/data-contracts';
	import Fa from 'svelte-fa';
	import { listURLs } from '$lib/actions/links';
	import { ICONS } from '$lib/config';
</script>

<script lang="ts">
	export let currentEvent: Writable<EventRead>;

	const links = listURLs($currentEvent?.description);
	const howToAddLink = 'Klicke auf den Tab <em>Was & Wann</em>, um Links hinzufügen.';
</script>

{#if links.length > 0}
	<p class="mt-2">
		{@html howToAddLink}
	</p>
{/if}

{#if links.length > 0}
	<p class="label">Links</p>
{:else}
	<p>Hier gibt es noch keine Links.</p>
	{#if !$currentEvent.isFrozen}
		<p class="mt-2">
			{@html howToAddLink}
		</p>
	{/if}
{/if}

<ul>
	{#each links as link}
		<li class="is-flex is-justify-content-space-between">
			<a href={link.href} target="new">{link.label}</a>
		</li>
	{/each}
</ul>
