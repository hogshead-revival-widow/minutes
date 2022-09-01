import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';
import { get } from 'svelte/store';

import type { CollectionRead, EventRead } from '$lib/api/data-contracts';
import { makeTimeline } from '$lib/actions/timeline';
import type { Options } from '$lib/config';
import { type Filter, getFilters } from './filter';

export const addEventsToStore = (
	collection: Writable<CollectionRead>,
	timeline: Writable<EventRead[]>,
	activeFilters: Writable<Filter[]>,
	events: EventRead[]
) => {
	const currentCollection = get(collection);

	currentCollection.events = [...currentCollection.events, ...events];
	collection.set(currentCollection);
	const filteredEvents = currentCollection.events.filter(getFilters(get(activeFilters)));
	timeline.set(makeTimeline(filteredEvents));
};

export const updateEventsInStore = (
	collection: Writable<CollectionRead>,
	timeline: Writable<EventRead[]>,
	activeFilters: Writable<Filter[]>,
	events: EventRead[],
	action: 'update' | 'remove' = 'update'
) => {
	const currentCollection = get(collection);
	const actionableEventsByIDs = events.map((event) => event.id);
	currentCollection.events = currentCollection.events.filter(
		(event) => !actionableEventsByIDs.includes(event.id)
	);
	if (action !== 'remove') currentCollection.events = [...currentCollection.events, ...events];
	collection.set(currentCollection);

	const filteredEvents = currentCollection.events.filter(getFilters(get(activeFilters)));
	timeline.set(makeTimeline(filteredEvents));
};

type ContextMap = {
	collection: Writable<CollectionRead>;
	timeline: Writable<EventRead[]>;
	options: Writable<Options>;
};
type GetContext = <T extends keyof ContextMap>(key: T) => ContextMap[T];
type SetContext = <T extends keyof ContextMap>(key: T, value: ContextMap[T]) => ContextMap[T];

export const getContextStore: GetContext = (key) => getContext(key);
export const setContextStore: SetContext = (key, value) => setContext(key, value);
export const getAllContextStores: () => ContextMap = () => ({
	collection: getContext('collection'),
	timeline: getContext('timeline'),
	options: getContext('options')
});

export const contextualise = (fromCollection: CollectionRead) => {
	const fromOptions: Options = {
		sortBy: 'newestFirst',
		renderAs: 'LIST',
		activeFilters: writable([])
	};
	const collection = setContext('collection', writable(fromCollection));
	const options = setContext('options', writable(fromOptions));
	const timeline = setContext('timeline', writable(makeTimeline(get(collection).events)));

	return { collection, options, timeline };
};
