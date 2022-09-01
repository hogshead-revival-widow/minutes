import type { EntityRead } from '$lib/api/data-contracts';
import { isEmail, isUUID } from '$lib/config';

export const getRandomID = () => new Date().getTime().toString() + Math.random();

export const getDomain = (maybeMail: string) => {
	if (!isEmail(maybeMail)) return '';
	const splitted = maybeMail.split('@');
	return splitted[splitted.length - 1].toLowerCase();
};

export const isEventRead = (value: EntityRead | string): value is EntityRead =>
	typeof value !== 'string';

export type BoolKeys<T> = { [k in keyof T]: T[k] extends boolean ? k : never }[keyof T];

export const throwForNotUUID = (value: unknown) => {
	if (!isUUID(value)) throw new Error(`${value} is not an UUID`);
};
