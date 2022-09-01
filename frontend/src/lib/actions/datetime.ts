import { LOCALE, LOG_EVENT_DATE_FORMAT, LOG_EVENT_TIME_FORMAT } from '$lib/config';

export const parseTime = (
	time: string | null,
	format: typeof LOG_EVENT_TIME_FORMAT = LOG_EVENT_TIME_FORMAT,
	locale: typeof LOCALE = LOCALE
) => {
	if (time === null) return null;
	const tempDate = new Date();
	const splittedTime = time.split(':').map((value) => parseInt(value));

	const [hours, minutes] = splittedTime;
	const seconds = splittedTime.length > 2 ? splittedTime[2] : 0;

	tempDate.setHours(hours);
	tempDate.setMinutes(minutes);
	tempDate.setSeconds(seconds);
	return tempDate.toLocaleString(locale, format);
};

export const parseDate = (
	date: string,
	format: typeof LOG_EVENT_DATE_FORMAT = LOG_EVENT_DATE_FORMAT,
	locale: typeof LOCALE = LOCALE
) => new Date(date).toLocaleString(locale, format);
