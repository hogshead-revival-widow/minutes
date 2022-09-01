import { POLLING_INTERVAL_COLLECTION } from '$lib/config';
import { invalidate } from '$app/navigation';

export const startRefreshing = () => {
	const refresh = () => {
		invalidate();
	};
	const interval = setInterval(refresh, POLLING_INTERVAL_COLLECTION);
	return () => clearInterval(interval);
};
