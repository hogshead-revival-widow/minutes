/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AnyEntity {
	/** Discriminator */
	discriminator: 'PERSON' | 'LOCATION' | 'ORGANIZATION';

	/** Name */
	name: string;

	/** Ndbnormid */
	ndbNormId?: number;
}

export interface AttachmentRead {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;

	/** Title */
	title: string;

	/** Path */
	path: string;

	/** Link */
	link?: string;
}

export interface BodyAddAttachmentApiEventEventIdAttachmentPost {
	/**
	 * Attachment
	 * @format binary
	 */
	attachment: File;
}

export interface CollectionCreate {
	/** Title */
	title: string;

	/** Isfrozen */
	isFrozen?: boolean;
}

export interface CollectionRead {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;

	/** Title */
	title: string;

	/**
	 * Datetime
	 * @format date-time
	 */
	datetime: string;

	/** Isfrozen */
	isFrozen: boolean;

	/** Events */
	events: EventRead[];
}

export interface CollectionSimpleRead {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;

	/** Title */
	title: string;

	/**
	 * Datetime
	 * @format date-time
	 */
	datetime: string;

	/** Isfrozen */
	isFrozen: boolean;
}

export interface CollectionUpdate {
	/** Title */
	title?: string;

	/** Isfrozen */
	isFrozen?: boolean;
}

export interface EntityRead {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;

	/** Name */
	name: string;

	/** Discriminator */
	discriminator: string;

	/** Ndbnormid */
	ndbNormId?: number;
}

/**
 * An enumeration.
 */
export enum EntityType {
	PERSON = 'PERSON',
	LOCATION = 'LOCATION',
	ORGANIZATION = 'ORGANIZATION'
}

export interface EventCreate {
	/**
	 * Collectionid
	 * @format uuid
	 */
	collectionId: string;

	/** Title */
	title: string;

	/** Description */
	description?: string;

	/**
	 * Contact
	 * @format email
	 */
	contact?: string;

	/**
	 * Date
	 * @format date
	 */
	date: string;

	/**
	 * Time
	 * @format time
	 */
	time?: string;

	/** Timezone */
	timezone?: string;

	/** Isfrozen */
	isFrozen?: boolean;

	/** Isconfirmed */
	isConfirmed?: boolean;

	/** Isimportant */
	isImportant?: boolean;

	/** Entities */
	entities?: string[];

	/** Referencedevents */
	referencedEvents?: string[];
}

export interface EventRead {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;

	/** Title */
	title: string;

	/** Description */
	description?: string;

	/**
	 * Contact
	 * @format email
	 */
	contact?: string;

	/**
	 * Date
	 * @format date
	 */
	date: string;

	/**
	 * Time
	 * @format time
	 */
	time?: string;

	/** Timezone */
	timezone: string;

	/** Isfrozen */
	isFrozen: boolean;

	/** Isconfirmed */
	isConfirmed: boolean;

	/** Isimportant */
	isImportant: boolean;

	/**
	 * Collectionid
	 * @format uuid
	 */
	collectionId: string;

	/** Referencedevents */
	referencedEvents: EventSimpleRead[];

	/** Entities */
	entities: EntityRead[];

	/** Attachments */
	attachments: AttachmentRead[];
}

export interface EventSimpleRead {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;

	/** Title */
	title: string;

	/** Description */
	description?: string;

	/**
	 * Contact
	 * @format email
	 */
	contact?: string;

	/**
	 * Date
	 * @format date
	 */
	date: string;

	/**
	 * Time
	 * @format time
	 */
	time?: string;

	/** Timezone */
	timezone: string;

	/** Isfrozen */
	isFrozen: boolean;

	/** Isconfirmed */
	isConfirmed: boolean;

	/** Isimportant */
	isImportant: boolean;
}

export interface EventUpdate {
	/** Title */
	title?: string;

	/** Description */
	description?: string;

	/**
	 * Contact
	 * @format email
	 */
	contact?: string;

	/**
	 * Date
	 * @format date
	 */
	date?: string;

	/**
	 * Time
	 * @format time
	 */
	time?: string;

	/** Timezone */
	timezone?: string;

	/** Isfrozen */
	isFrozen?: boolean;

	/** Isconfirmed */
	isConfirmed?: boolean;

	/** Isimportant */
	isImportant?: boolean;

	/** Entities */
	entities?: string[];

	/** Referencedevents */
	referencedEvents?: string[];
}

export interface HTTPValidationError {
	/** Detail */
	detail?: ValidationError[];
}

export interface ValidationError {
	/** Location */
	loc: (string | number)[];

	/** Message */
	msg: string;

	/** Error Type */
	type: string;
}
