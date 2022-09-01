<script context="module" lang="ts">
	import MyDate from '$lib/components/basic/datetime/Date.svelte';
	import Time from '$lib/components/basic/datetime/Time.svelte';

	import { LOG_EVENT_DATE_FORMAT, LOG_EVENT_TIME_FORMAT } from '$lib/config';
</script>

<script lang="ts">
	export let datetime: string | undefined = undefined;
	export let date: string | undefined = undefined;
	export let dateFormat: Intl.DateTimeFormatOptions = LOG_EVENT_DATE_FORMAT;

	export let time: string | undefined = undefined;
	export let timeFormat: Intl.DateTimeFormatOptions = LOG_EVENT_TIME_FORMAT;

	let hasDatetime = false;
	let hasDate = false;
	let hasTime = false;
	$: {
		hasDatetime = typeof datetime === 'string' && datetime.length == 26;
		if (hasDatetime) {
			date = datetime.split('T')[0];
			time = datetime.split('T')[1];
		}
		hasDate = typeof date === 'string' && date.length == 10;
		hasTime = typeof time === 'string' && time.length >= 5;
	}
</script>

{#if hasDate}
	<MyDate {date} {dateFormat} />{#if hasTime}, {/if}
{/if}
{#if hasTime}
	<Time {time} {timeFormat} />
{/if}
