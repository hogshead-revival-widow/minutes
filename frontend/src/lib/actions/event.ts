import { get, type Writable, writable } from 'svelte/store';
import { Minutes } from '$lib/api';
import type {
	AttachmentRead,
	CollectionRead,
	EventCreate,
	EventRead,
	EventUpdate
} from '$lib/api/data-contracts';
import { addEventsToStore, updateEventsInStore } from '$lib/actions/context';
import type { Filter } from './filter';
export const currentEvent: Writable<EventRead | undefined> = writable(undefined);
export const resetCurrentEvent = () => currentEvent.set(undefined);

export const DIALOG_ID = 'add-new-event';

export const showAddDialog = () => {
	const selector = `[aria-controls="${DIALOG_ID}"]:not(.is-active)`;
	const trigger = document.querySelector(selector);
	if (trigger instanceof HTMLElement) trigger.click();
};

interface EventParams {
	collection: Writable<CollectionRead>;
	timeline: Writable<EventRead[]>;
	activeFilters: Writable<Filter[]>;
}

interface AddParams {
	values: Omit<EventCreate, 'collectionId'>;
}
export const quickAddEvent = async ({
	collection,
	timeline,
	activeFilters,
	values
}: EventParams & AddParams) => {
	const storedCollection = get(collection);

	console.log('hi');
	const data: EventCreate = {
		collectionId: storedCollection.id,
		...values
	};
	try {
		const event = await Minutes.createEvent(data);
		addEventsToStore(collection, timeline, activeFilters, [event]);
		return event;
	} catch (error) {
		console.error(error);
	}
};

interface AddMoreParams extends EventParams {
	currentEvent: EventRead;
	update: EventUpdate;
}

export const addMore = async ({
	collection,
	timeline,
	activeFilters,
	currentEvent,
	update
}: AddMoreParams) => {
	try {
		const updatedEvent = await Minutes.updateEvent(currentEvent.id, update);
		updateEventsInStore(collection, timeline, activeFilters, [updatedEvent]);
		return updatedEvent;
	} catch (error) {
		console.error(error);
	}
};

interface AddAttachmentParams extends EventParams {
	currentEvent: EventRead;
	attachments: File[];
}

export const addAttachments = async ({
	collection,
	timeline,
	activeFilters,
	currentEvent,
	attachments
}: AddAttachmentParams) => {
	try {
		const promises = attachments.map((file) =>
			Minutes.addAttachment(currentEvent.id, { attachment: file })
		);
		await Promise.all(promises);
		const updatedEvent = await Minutes.readEvent(currentEvent.id);
		updateEventsInStore(collection, timeline, activeFilters, [updatedEvent]);
		return updatedEvent;
	} catch (error) {
		console.error(error);
	}
};

interface RemoveAttachmentParams extends EventParams {
	currentEvent: EventRead;
	currentAttachment: AttachmentRead;
}
export const removeAttachment = async ({
	collection,
	timeline,
	activeFilters,
	currentEvent,
	currentAttachment
}: RemoveAttachmentParams) => {
	try {
		const updatedEvent = await Minutes.removeAttachment(currentEvent.id, currentAttachment.id);
		updateEventsInStore(collection, timeline, activeFilters, [updatedEvent]);
		return updatedEvent;
	} catch (error) {
		console.error(error);
	}
};

interface DeleteEventParams extends EventParams {
	currentEvent: EventRead;
}
export const deleteEvent = async ({
	collection,
	timeline,
	activeFilters,
	currentEvent
}: DeleteEventParams) => {
	try {
		const deletedEvent = await Minutes.deleteEvent(currentEvent.id);
		updateEventsInStore(collection, timeline, activeFilters, [deletedEvent], 'remove');
		return deletedEvent;
	} catch (error) {
		console.error(error);
	}
};

interface UpdateEventParams extends EventParams {
	currentEvent: EventRead;
	update: EventUpdate;
}
export const updateEvent = async ({
	collection,
	timeline,
	activeFilters,
	currentEvent,
	update
}: UpdateEventParams) => addMore({ collection, timeline, activeFilters, currentEvent, update });
