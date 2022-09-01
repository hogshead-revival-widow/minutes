import type { EventRead } from '$lib/api/data-contracts';

const asDateTime = (item: EventRead | string) => {
	return typeof item === 'string'
		? item
		: item.date + 'T' + (item.time !== null ? item.time : '00:00');
};

const newestFirst = (that: EventRead | string, other: EventRead | string) =>
	new Date(asDateTime(other)).getTime() - new Date(asDateTime(that)).getTime();

export const makeTimeline = (events: EventRead[]) => {
	return events.sort(newestFirst);
};
