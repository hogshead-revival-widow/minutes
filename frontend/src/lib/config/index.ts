import {
	POLLING_INTERVAL_COLLECTIONS,
	POLLING_INTERVAL_COLLECTION,
	type Options,
	RENDER_AS,
	SINGLE_SEARCHBOX_PER_PAGE_ID,
	OFFER_TEAMS_FOR_DOMAINS
} from '$lib/config/settings';

import { ICONS } from '$lib/config/icons';
import { contact } from '$lib/config/stores';
import {
	addEventSchema,
	addEmailSchema,
	addCollectionSchema,
	updateCollectionSchema,
	updateEventSchema,
	isUUID,
	isEmail
} from '$lib/config/validation';

import {
	LOCALE,
	LOG_COLLECTION_DATE_FORMAT,
	LOG_COLLECTION_DATE_FORMAT_SHORT,
	LOG_EVENT_DATE_FORMAT,
	LOG_EVENT_TIME_FORMAT
} from '$lib/config/datetime';

export {
	contact,
	ICONS,
	addEventSchema,
	addEmailSchema,
	addCollectionSchema,
	updateCollectionSchema,
	updateEventSchema,
	isUUID,
	isEmail,
	LOCALE,
	LOG_COLLECTION_DATE_FORMAT,
	LOG_COLLECTION_DATE_FORMAT_SHORT,
	LOG_EVENT_DATE_FORMAT,
	LOG_EVENT_TIME_FORMAT,
	POLLING_INTERVAL_COLLECTIONS,
	POLLING_INTERVAL_COLLECTION,
	Options,
	RENDER_AS,
	SINGLE_SEARCHBOX_PER_PAGE_ID,
	OFFER_TEAMS_FOR_DOMAINS
};
