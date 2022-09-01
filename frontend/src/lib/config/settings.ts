import type { SvelteComponent } from 'svelte';
import type { Writable } from 'svelte/store';
import WideList from '$lib/components/timeline/render/WideList.svelte';
import CompactList from '$lib/components/timeline/render/CompactList.svelte';
import Charts from '$lib/components/timeline/render/Charts.svelte';

export const POLLING_INTERVAL_COLLECTIONS = 120000; // ms
export const POLLING_INTERVAL_COLLECTION = 120000; // ms

export interface Options {
	sortBy: 'newestFirst' | 'oldestFirst';
	renderAs: 'CHARTS' | 'LIST' | 'COMPACT_LIST';
	activeFilters: Writable<
		{ label: string; getFilterFunction: () => (item: unknown) => boolean; id: string }[]
	>;
}

export const RENDER_AS: Record<Options['renderAs'], typeof SvelteComponent> = {
	CHARTS: Charts,
	LIST: WideList,
	COMPACT_LIST: CompactList
};

export const SINGLE_SEARCHBOX_PER_PAGE_ID = 'searchbox';

export const OFFER_TEAMS_FOR_DOMAINS = ['swr.de', 'sr.de'];
