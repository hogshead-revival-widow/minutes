import { loadCollection } from '$lib/actions/load';
import type { PageLoad } from './$types';

export const load: PageLoad = loadCollection;
