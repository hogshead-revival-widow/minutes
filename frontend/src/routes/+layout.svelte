<script lang="ts" context="module">
	import '../app.scss';
	import { fly } from 'svelte/transition';
	import Menu from '$lib/components/Menu.svelte';
	import Modal from 'svelte-simple-modal';
</script>

<body>
	<Modal transitionBg={(node) => fly(node, { duration: 250, y: -20 })}>
		<main class="container has-navbar-fixed-top fixed-width">
			<slot />
		</main>

		<Menu />
	</Modal>
</body>
