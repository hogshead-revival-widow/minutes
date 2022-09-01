<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import ToggleListRendering from '$lib/components/timeline/render/ToggleListRendering.svelte';
	import Share from '$lib/components/Share.svelte';
	import Sort from '$lib/components/timeline/Sort.svelte';
	import Add from '$lib/components/event/Add.svelte';
	import Search from '$lib/components/Search.svelte';
	import Filter from '$lib/components/timeline/filter/FilterEvent.svelte';
	import ToggleCharts from '$lib/components/timeline/render/ToggleCharts.svelte';
	import SetEmail from '$lib/components/SetEmail.svelte';
	import Fa from 'svelte-fa';
	import { getAllContextStores } from '$lib/actions/context';
	import { contact, ICONS } from '$lib/config';
</script>

<script lang="ts">
	const { collection, timeline, options } = getAllContextStores();
	const { activeFilters } = $options;
	// @ts-expect-error: Bug in svelte language tools
	const { open } = getContext('simple-modal');

	const showAdd = () => {
		const proceedWith = { component: Add, props: { collection, timeline, activeFilters } };
		if ($contact === '') {
			open(SetEmail, { proceedWith });
		} else {
			open(proceedWith.component, proceedWith.props);
		}
	};
</script>

<nav class="has-text-centered" class:sticky-menu={$collection.events.length > 0}>
	<ul>
		{#if $collection.events.length > 0}
			<li class="mb-6">
				<button
					on:click={showAdd}
					class="sticky-menu-button is-primary"
					title="Ereignis hinzufügen"
				>
					<Fa {...ICONS['PLUS']} />
				</button>
			</li>
			<li class:mb-6={$collection.events.length === 0}><ToggleListRendering /></li>
		{/if}
		{#if $collection.events.length > 1}
			<li><Sort /></li>
			<li>
				<Filter />
			</li>
			<li><Search /></li>
			<li class="mb-6">
				<ToggleCharts />
			</li>
		{/if}
		<li>
			<Share
				classes="sticky-menu-button is-outlined"
				isRight={false}
				target={$page.url.href.split('?')[0]}
				message="Link zu diesem Protokoll kopiert!"
				title="Link zu diesem Protokoll teilen"
			/>
		</li>
	</ul>
</nav>
