<script lang="ts" context="module">
	import { type ComponentProps, getContext, type SvelteComponent } from 'svelte';
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';
	import Dropdown from '$lib/components/basic/Dropdown.svelte';
	import Info from '$lib/components/Info.svelte';
	import SetEmail from '$lib/components/SetEmail.svelte';
	import { ICONS } from '$lib/config';
</script>

<script lang="ts">
	// @ts-expect-error: Bug in svelte language tools
	const { open } = getContext('simple-modal');

	type MenuItem = {
		id: number;
		label: string;
		link?: string;
		modal?: { component: typeof SvelteComponent; props: Record<string, any> };
		icon: ComponentProps<Fa>;
	};
	const menuItems: MenuItem[] = [
		{
			id: 0,
			label: 'Protokoll',
			link: '/collection/new',
			icon: ICONS['PLUS']
		},
		{
			id: 1,
			label: 'alle Protokolle',
			link: '/',
			icon: ICONS['ARCHIVE']
		},
		{
			id: 2,
			label: 'E-Mail ändern',
			modal: { component: SetEmail, props: {} },
			icon: ICONS['EMAIL']
		},
		{
			id: 4,
			label: 'FAQ / Kontakt',
			modal: { component: Info, props: {} },
			icon: ICONS['INFO']
		}
	];

	let isActive = false;
	let activeItem = -1;
	const setActive = (item: MenuItem) => {
		activeItem = item.id;
	};

	$: if (!isActive) {
		activeItem = -1;
	}
</script>

<nav class="top-menu">
	<Dropdown isRight={true} bind:isActive>
		<button slot="trigger" class="button is-ghost is-large has-text-black" title="Protokoll-Menü">
			<Fa {...ICONS['HAMBURGER']} />
		</button>

		<nav class="menu">
			<ul class="menu-list">
				{#each menuItems as item}
					<li>
						{#if item?.link}
							<a
								href={item.link}
								class:is-active={activeItem === item.id ||
									(activeItem === -1 && $page.url.pathname === item.link)}
								on:click={() => setActive(item)}
							>
								<span class="icon">
									<Fa {...item.icon} />
								</span>
								{item.label}
							</a>
						{:else}
							<!-- svelte-ignore a11y-invalid-attribute -->
							<a
								href=""
								class:is-active={activeItem === item.id}
								on:click={() => {
									setActive(item);
									open(item.modal.component, item.modal.props);
								}}
							>
								<span class="icon">
									<Fa {...item.icon} />
								</span>
								{item.label}
							</a>
						{/if}
					</li>
				{/each}
			</ul>
		</nav>
	</Dropdown>
</nav>
