<script lang="ts" context="module">
	import { scale } from 'svelte/transition';
	import { clickOutside } from '$lib/actions/clickOutside';
	import { getRandomID } from '$lib/utils';
</script>

<script lang="ts">
	export let isActive = false;
	export let isUp = false;
	export let isHoverable = false;
	export let title: string = '';
	export let noAutoClose = false;
	export let isRight = false;
	export let closeOnClickOutside = true;
	export let id = `dropdown-${getRandomID()}`;
	export let classes = '';
	let isLeft = !isRight;
	const closeOtherDropdowns = () => {
		const currentDropdown = id;
		const selector = `div.dropdown.is-active:not(.dropdown-no-auto-close) > div.dropdown-trigger:not([aria-controls="${currentDropdown}"])`;
		const activeDropdownTriggers = document.querySelectorAll(selector);
		activeDropdownTriggers.forEach((trigger) => trigger instanceof HTMLElement && trigger.click());
	};

	const closeFromOutside = () => {
		if (!closeOnClickOutside || isHoverable) return;
		if (isActive) {
			isActive = false;
		}
	};
	const toggle = () => {
		if (isHoverable) return;
		isActive = !isActive;
		if (!noAutoClose) {
			closeOtherDropdowns();
		}
	};
</script>

<div
	class="dropdown has-text-left {classes}"
	class:is-active={isActive}
	class:is-up={isUp}
	class:is-hoverable={isHoverable}
	class:dropdown-no-auto-close={noAutoClose}
	class:is-right={isRight}
	class:is-left={isLeft}
	use:clickOutside
	on:clickedOutside={closeFromOutside}
>
	<div
		class="dropdown-trigger is-clickable"
		aria-haspopup="true"
		class:is-active={isActive}
		aria-controls={id}
		on:click={toggle}
	>
		<slot name="trigger" />
	</div>

	{#if isActive || isHoverable}
		<div class="dropdown-menu " {id} role="menu" in:scale={{ start: 0.9 }}>
			<div class="dropdown-content">
				<div class="dropdown-item">
					{#if !isHoverable && !closeOnClickOutside}
						<button class="delete is-pulled-right ml-2" on:click={toggle} />
					{/if}
					{#if title !== ''}
						<h2 class="lead has-text-centered is-size-5 title">
							{title}
						</h2>
					{/if}
					<slot />
				</div>
			</div>
		</div>
	{/if}
</div>
