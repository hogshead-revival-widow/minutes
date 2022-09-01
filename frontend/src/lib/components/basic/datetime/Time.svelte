<script lang="ts">
	import { parseTime } from '$lib/actions/datetime';

	export let time: string;
	export let timeFormat: Intl.DateTimeFormatOptions;

	let parsedTime = '';
	$: {
		time;
		parsedTime = parseTime(time, timeFormat);
	}
</script>

<time>{parsedTime}</time>
