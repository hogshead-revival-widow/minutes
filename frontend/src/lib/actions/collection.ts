import { get, type Writable } from 'svelte/store';
import type { CollectionCreate, CollectionUpdate, CollectionRead } from '$lib/api/data-contracts';
import { Minutes } from '$lib/api';

export const addCollection = async ({ title }: CollectionCreate) => {
	try {
		const data = { title };
		const collectionRead = await Minutes.createCollection(data);
		return collectionRead;
	} catch (error) {
		console.error(error);
	}
};

export const updateCollection = async (
	collection: Writable<CollectionRead>,
	{ title }: CollectionUpdate
) => {
	try {
		const data = { title };
		const currentCollection = get(collection);
		const { id } = currentCollection;
		const updatedCollection = await Minutes.updateCollection(id, data);
		const refreshedCollection = Object.assign(currentCollection, updatedCollection);
		collection.set(refreshedCollection);
		return refreshedCollection;
	} catch (error) {
		console.error(error);
	}
};
