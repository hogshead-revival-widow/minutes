<script lang="ts">
	export let classes = 'mb-6 pr-6 pl-6';
	export let titleClasses = '';
	export let title: string;
</script>

<header class={classes}>
	<h1 class="lead title has-text-centered block {titleClasses}">{title}</h1>
	<slot />
</header>
