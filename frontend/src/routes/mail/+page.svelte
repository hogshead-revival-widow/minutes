<script context="module" lang="ts">
	import SetEmail from '$lib/components/SetEmail.svelte';
	import { contact } from '$lib/config';
</script>

<script lang="ts">
	let title = 'E-Mail ändern';
	if ($contact.length === 0) title = 'E-Mail angeben';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<SetEmail contactIsEmpty={false} {title} />
