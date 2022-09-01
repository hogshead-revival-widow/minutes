<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { writable } from 'svelte/store';
	import More from '$lib/components/event/More/index.svelte';
	import ApexCharts from 'apexcharts?client';
	import { getAllContextStores } from '$lib/actions/context';
	import {
		getAllPersons,
		getSeries,
		hasChartableEvents,
		makeChartOptions,
		type MakeTooltip,
		type OnDatapointSelection
	} from '$lib/actions/charts';
</script>

<script lang="ts">
	const { collection, timeline, options } = getAllContextStores();
	const { activeFilters } = $options;
	// @ts-expect-error: Bug in svelte language tools
	const { open } = getContext('simple-modal');

	const showEvent: OnDatapointSelection = (currentEvent) => {
		open(More, {
			currentEvent: writable(currentEvent),
			collection,
			timeline,
			activeFilters
		});
	};

	const makeTooltip: MakeTooltip = (currentEvent, currentPerson, date, time) => `
	<div class="box" style="max-width: 18rem;  white-space: normal;">

		<p class="lead">
			<date date=${currentEvent.date}>${date}</date>${time !== null ? `, um <time>${time}<time>` : ''}
		</p>

		<p>
			<mark>${currentPerson.name}</mark> steht in Beziehung zum Ereignis
			<mark>${currentEvent.title}</mark>
		</p>

		<p class="help">Tipp: Für Details klicken</p>
	</div>`;

	const chartOptions = makeChartOptions(showEvent, makeTooltip);

	$: eventsInCollection = hasChartableEvents($collection.events);
	$: eventsInTimline = hasChartableEvents($timeline);

	let chart;
	let series;
	$: {
		$timeline;
		series = getSeries(getAllPersons($timeline), $timeline);

		if (chart !== undefined) {
			chart.updateSeries(series);
		}
	}

	const drawChart = (node) => {
		chart = new ApexCharts(node, chartOptions);
		chart.render();
	};
</script>

<article class="boxed-content">
	<h1 class="title lead">Wer war wann beteiligt?</h1>
	{#if eventsInTimline}
		<div use:drawChart />
	{/if}
</article>

{#if !eventsInTimline}
	<div class="box">
		{#if eventsInCollection}
			<p class="lead">Leider keine zur Visualisierung geeigneten Ereignisse gefunden.</p>
			{#if $activeFilters.length > 0}
				<p class="help">Entferne Filter, um ggf. mehr Ergebnisse zu erhalten.</p>
			{/if}
		{:else}
			<p>
				Sobald Du mindestens einem Ereignis mindestens eine Person hinzugefügt hast, findest Du hier
				eine Visualisierung dieser Frage.
			</p>
		{/if}
	</div>
{/if}
