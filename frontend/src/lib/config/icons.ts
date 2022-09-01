import type { ComponentProps } from 'svelte';
import { EntityType } from '$lib/api/data-contracts';
import {
	faCheckCircle,
	faEdit,
	faFile,
	faFilter,
	faLink,
	faLocationDot,
	faPerson,
	faTrashCan,
	faEllipsis,
	faList,
	faTimeline,
	faInfoCircle,
	faBars,
	faArchive,
	faPlus,
	faSearch,
	faCopy,
	faShare,
	faArrowAltCircleRight,
	faFileText,
	faCircleExclamation,
	faComments,
	faCircleQuestion,
	faClipboardList,
	faUniversity,
	faMessage,
	faEnvelope,
	faCalendarDay,
	faLock,
	faLockOpen,
	faContactBook,
	faListAlt,
	faCompressAlt,
	faLightbulb
} from '@fortawesome/free-solid-svg-icons';
import type Fa from 'svelte-fa';

export const ICONS: Record<string, ComponentProps<Fa>> = {
	[EntityType.LOCATION]: {
		icon: faLocationDot
	},
	[EntityType.ORGANIZATION]: {
		icon: faUniversity
	},
	[EntityType.PERSON]: {
		icon: faPerson
	},
	REFERENCED_EVENT: {
		icon: faCalendarDay
	},
	DESCRIPTION: {
		icon: faFileText
	},
	ATTACHMENT: {
		icon: faFile
	},
	DELETE: {
		icon: faTrashCan
	},
	EDIT: {
		icon: faEdit
	},
	REFERENCE: {
		icon: faLink,
		rotate: 90
	},
	FILTER: {
		icon: faFilter
	},
	CONFIRMED: {
		icon: faCheckCircle
	},
	IMPORTANT: {
		icon: faCircleExclamation
	},
	ELLIPSIS: {
		icon: faEllipsis
	},
	LIST: {
		icon: faList,
		rotate: 180
	},
	COMPACT_LIST: {
		icon: faListAlt,
		rotate: 180
	},
	CHARTS: {
		icon: faLightbulb
	},
	TIMELINE: {
		icon: faTimeline,
		rotate: 90
	},
	INFO: {
		icon: faInfoCircle
	},
	HAMBURGER: {
		icon: faBars
	},
	ARCHIVE: {
		icon: faArchive
	},
	PLUS: {
		icon: faPlus
	},
	SEARCH: {
		icon: faSearch
	},
	COPY: {
		icon: faCopy
	},
	SHARE: {
		icon: faShare
	},
	GOTO: {
		icon: faArrowAltCircleRight
	},
	COMPRESS: {
		icon: faCompressAlt
	},
	CONTACT: {
		icon: faComments
	},
	QUESTION: {
		icon: faCircleQuestion
	},
	PROTOCOL: {
		icon: faClipboardList
	},
	TEAMS: {
		icon: faMessage
	},
	EMAIL: {
		icon: faEnvelope
	},
	FROZEN: {
		icon: faLock
	},
	UNFROZEN: {
		icon: faLockOpen
	},
	CONTACTBOOK: {
		icon: faContactBook
	}
};
