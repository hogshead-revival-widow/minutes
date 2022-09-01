import { writable, type Writable } from 'svelte/store';

const localContact =
	typeof localStorage !== 'undefined' ? localStorage.getItem('contact') ?? '' : '';
export const contact: Writable<string> = writable(localContact);
contact.subscribe((value: string) => {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('contact', value);
	}
	contact.set(value);
});
