import { loadCollections } from '$lib/actions/load';
import type { PageLoad } from './$types';

export const load: PageLoad = loadCollections;
