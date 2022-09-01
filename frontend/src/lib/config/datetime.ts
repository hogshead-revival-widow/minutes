export const LOCALE = 'de-DE';

export const LOG_COLLECTION_DATE_FORMAT: Intl.DateTimeFormatOptions = {
	day: 'numeric',
	month: 'long',
	year: 'numeric'
};

export const LOG_COLLECTION_DATE_FORMAT_SHORT: Intl.DateTimeFormatOptions = {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric'
};

export const LOG_EVENT_DATE_FORMAT: Intl.DateTimeFormatOptions = {
	weekday: 'long',
	day: 'numeric',
	month: 'long',
	year: 'numeric'
};

export const LOG_EVENT_TIME_FORMAT: Intl.DateTimeFormatOptions = {
	minute: 'numeric',
	hour: 'numeric'
};
