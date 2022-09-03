<script lang="ts" context="module">
	import type { Writable } from 'svelte/store';
	import type { EventRead } from '$lib/api/data-contracts';
	import { listURLs } from '$lib/actions/links';
</script>

<script lang="ts">
	export let currentEvent: Writable<EventRead>;

	const links = listURLs($currentEvent?.description);
	const howToAddLink = 'Klicke auf den Tab <em>Was & Wann</em>, um Links hinzufügen.';
</script>

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
{#each links as link}
	<ul>
		<li>
			<a href={link} target="new">{link}</a>
		</li>
	</ul>
{/each}
{#if links.length > 0}
	<p class="mt-2">
		{@html howToAddLink}
	</p>
{/if}
