import type { LoadEvent } from '@sveltejs/kit';
import { makeMinutes } from '$lib/api';
import { throwForNotUUID } from '$lib/utils';

export const loadCollection = async ({ fetch, params }: LoadEvent) => {
	const { collectionId } = params;
	throwForNotUUID(collectionId);
	const Minutes = makeMinutes({ customFetch: fetch });
	const collectionRead = await Minutes.readCollection(collectionId);

	return {
		collectionRead
	};
};

export const loadCollections = async ({ fetch }: LoadEvent) => {
	const Minutes = makeMinutes({ customFetch: fetch });
	const collectionsRead = await Minutes.listCollections();
	return {
		collectionsRead
	};
};

export const loadEvent = async ({ fetch, params }: LoadEvent) => {
	const { collectionId, eventId } = params;
	throwForNotUUID(collectionId);
	throwForNotUUID(eventId);
	const Minutes = makeMinutes({ customFetch: fetch });
	const collectionRead = await Minutes.readCollection(collectionId);
	const eventRead = await Minutes.readEvent(eventId);

	return {
		collectionRead,
		eventRead
	};
};
