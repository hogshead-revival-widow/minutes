<script lang="ts" context="module">
	import Fa from 'svelte-fa';
	import Dropdown from '$lib/components/basic/Dropdown.svelte';
	import { onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { ICONS } from '$lib/config';
</script>

<script lang="ts">
	export let message = 'Link kopiert!';
	export let title = 'Link teilen';
	export let classes = '';
	export let target = $page.url.href;
	export let isUp = true;
	export let isRight = true;

	let isActive = false;
	let copied = false;
	let timeoutID: number | undefined = undefined;

	const copy = async () => {
		await navigator.clipboard.writeText(target);
		copied = true;
		clearTimeout(timeoutID);
		setTimeout(() => (copied = false), 1500);
	};

	onDestroy(() => clearTimeout(timeoutID));
</script>

<Dropdown {isUp} {isRight} bind:isActive>
	<button
		class="button {classes}"
		slot="trigger"
		aria-haspopup="true"
		aria-controls="share-timeline"
		{title}
	>
		<span class="icon"><Fa {...ICONS['SHARE']} /></span>
	</button>

	<div style="min-width: 20em;">
		<div class="field has-addons" on:click={copy}>
			<div class="control has-icons-left  is-expanded">
				<input
					class="input is-active"
					class:is-success={copied}
					type="text"
					readonly
					value={target}
				/>
				<span
					class="icon is-left"
					class:has-text-grey-light={!copied}
					class:has-text-success={copied}
				>
					<Fa {...ICONS['SHARE']} />
				</span>
			</div>

			<div class="control">
				<button type="submit" class="button is-link is-outlined" class:is-success={copied}>
					<Fa {...ICONS['COPY']} />
				</button>
			</div>
		</div>

		<p class="mt-2 mb-2 lead" class:is-invisible={!copied}>{message}</p>
	</div>
</Dropdown>
