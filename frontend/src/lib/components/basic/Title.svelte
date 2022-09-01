<script lang="ts">
	export let classes = '';
	export let title: string;
	classes = 'mb-6 pr-6 pl-6';
</script>

<header class={classes}>
	<h1 class="lead title has-text-centered block">{title}</h1>

	<slot />
</header>
