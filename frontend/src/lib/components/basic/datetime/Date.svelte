<script lang="ts">
	import { parseDate } from '$lib/actions/datetime';

	export let date: string;
	export let dateFormat: Intl.DateTimeFormatOptions;

	let parsedDate = '';
	$: {
		parsedDate;
		parsedDate = parseDate(date, dateFormat);
	}
</script>

<date {date}>{parsedDate}</date>
