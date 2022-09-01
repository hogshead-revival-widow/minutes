<script lang="ts" context="module">
	import Dropzone from 'svelte-file-dropzone';
	import Fa from 'svelte-fa';
	import { addAttachments, removeAttachment } from '$lib/actions/event';
	import { fade, fly } from 'svelte/transition';
	import { ICONS } from '$lib/config';
	import type { CollectionRead, EventRead, AttachmentRead } from '$lib/api/data-contracts';
	import type { Writable } from 'svelte/store';
	import type { Filter } from '$lib/actions/filter';
</script>

<script lang="ts">
	export let currentEvent: Writable<EventRead>;
	export let collection: Writable<CollectionRead>;
	export let timeline: Writable<EventRead[]>;
	export let activeFilters: Writable<Filter[]>;

	const addAtachment = async (event: CustomEvent) => {
		const { acceptedFiles } = event.detail;
		$currentEvent = await addAttachments({
			collection,
			timeline,
			activeFilters,
			currentEvent: $currentEvent,
			attachments: acceptedFiles
		});
	};

	const deleteAttachment = async (attachment: AttachmentRead) => {
		$currentEvent = await removeAttachment({
			collection,
			timeline,
			activeFilters,
			currentEvent: $currentEvent,
			currentAttachment: attachment
		});
	};
</script>

{#if !$currentEvent.isFrozen}
	<div class="mb-6">
		<Dropzone on:drop={addAtachment}>Zum Anhänge Datei hier reinziehen oder klicken</Dropzone>
	</div>
{/if}

{#if $currentEvent.attachments.length === 0}
	<p>
		Diesem Ereignis wurden noch keine Dokumente angehängt.
		{#if !$currentEvent.isFrozen}
			Ziehe Dokumente in das graue Feld, um welche hinzuzufügen.
		{/if}
	</p>
{:else}
	<div class="has-text-grey mb-6" in:fade|local>
		<p class="label">Angehängte Dokumente</p>
		<ul>
			{#each $currentEvent.attachments as attachment}
				<li in:fly|local class="is-flex is-justify-content-space-between">
					<a href={attachment.link} title="{attachment.title} herunterladen" target="_blank">
						{attachment.title}
					</a>

					{#if !$currentEvent.isFrozen}
						<button
							class="is-small button is-outlined is-danger"
							on:click|preventDefault={() => deleteAttachment(attachment)}
						>
							<Fa {...ICONS['DELETE']} />
						</button>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
{/if}
