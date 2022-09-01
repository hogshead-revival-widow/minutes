/*
    Import api client from here.
    Note:
    - use `makeMinutes` inside load() to pass svelte-patched `fetch`
    - use `Minutes` in all other cases
*/

import { Api } from '$lib/api/Api';
import { HttpClient, type ApiConfig } from '$lib/api/http-client';

// use this inside load
export const makeMinutes = ({
	customFetch = undefined,
	baseUrl = import.meta.env.VITE_API_BASE_URL
}: ApiConfig = {}) => {
	const config: ApiConfig = { baseUrl };
	if (customFetch !== undefined) config.customFetch = customFetch;
	const client = new HttpClient(config);
	return new Api(client);
};

// use this outside load
export const Minutes = makeMinutes();
