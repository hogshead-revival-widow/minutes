import type { EventRead, EntityRead } from '$lib/api/data-contracts';

export type Filter = {
	label: string;
	getFilterFunction: () => (item: EventRead) => boolean;
	id: string;
};

export const makeReferencedEventFilter = (referencedEvent: EventRead) => ({
	id: referencedEvent.id,
	label: `<span title=${referencedEvent.title}>Verknüpfung: ${
		referencedEvent.title.slice(0, 15) + (referencedEvent.title.length >= 15 ? '...' : '')
	}</span>`,
	getFilterFunction: (fromEvent = referencedEvent) => {
		return (item) => fromEvent.referencedEvents.map((event) => event.id).includes(item.id);
	}
});

export const makeEntityFilter = (filterForEntity: EntityRead) => ({
	id: filterForEntity.id,
	entity: filterForEntity,
	label: filterForEntity.name,
	getFilterFunction: () => (item) =>
		item.entities.find((existingEntity) => existingEntity.id === filterForEntity.id)
});

export const isImportantFilter = {
	id: 'important',
	label: 'ist wichtig',
	iconKey: 'IMPORTANT',
	getFilterFunction: () => (item) => item.isImportant
};

export const isConfirmedFilter = {
	id: 'confirmed',
	label: 'ist geprüft',
	iconKey: 'CONFIRMED',
	getFilterFunction: () => (item) => item.isConfirmed
};

export const hasDescriptionFilter = {
	id: 'description',
	iconKey: 'DESCRIPTION',
	label: 'hat Beschreibung',
	getFilterFunction: () => (item) => item?.description && item.description.trim().length > 0
};

export const hasAttachmentFilter = {
	id: 'attachment',
	label: 'hat Anhang',
	iconKey: 'ATTACHMENT',
	getFilterFunction: () => (item) => item?.attachments && item.attachments.length > 0
};

export const getFilters = (currentFilters: Filter[]) => (item) =>
	currentFilters.every((activeFilter) => activeFilter.getFilterFunction()(item));
