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

import type {
	AnyEntity,
	BodyAddAttachmentApiEventEventIdAttachmentPost,
	CollectionCreate,
	CollectionRead,
	CollectionSimpleRead,
	CollectionUpdate,
	EntityRead,
	EntityType,
	EventCreate,
	EventRead,
	EventUpdate,
	HTTPValidationError
} from './data-contracts';
import { ContentType, HttpClient, type RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
	}

	/**
	 * No description
	 *
	 * @tags Collection
	 * @name ListCollections
	 * @summary List Collections
	 * @request GET:/api/collection
	 */
	listCollections = (params: RequestParams = {}) =>
		this.http.request<CollectionSimpleRead[], any>({
			path: `/api/collection`,
			method: 'GET',
			format: 'json',
			...params
		});
	/**
	 * No description
	 *
	 * @tags Collection
	 * @name CreateCollection
	 * @summary Create Collection
	 * @request POST:/api/collection
	 */
	createCollection = (data: CollectionCreate, params: RequestParams = {}) =>
		this.http.request<CollectionRead, HTTPValidationError>({
			path: `/api/collection`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			format: 'json',
			...params
		});
	/**
	 * No description
	 *
	 * @tags Collection
	 * @name ReadCollection
	 * @summary Read Collection
	 * @request GET:/api/collection/{collection_id}
	 */
	readCollection = (collectionId: string, params: RequestParams = {}) =>
		this.http.request<CollectionRead, HTTPValidationError>({
			path: `/api/collection/${collectionId}`,
			method: 'GET',
			format: 'json',
			...params
		});
	/**
	 * @description You can only update a non-frozen collection
	 *
	 * @tags Collection
	 * @name UpdateCollection
	 * @summary Update Collection
	 * @request PUT:/api/collection/{collection_id}
	 */
	updateCollection = (collectionId: string, data: CollectionUpdate, params: RequestParams = {}) =>
		this.http.request<CollectionSimpleRead, HTTPValidationError>({
			path: `/api/collection/${collectionId}`,
			method: 'PUT',
			body: data,
			type: ContentType.Json,
			format: 'json',
			...params
		});
	/**
	 * @description You can only delete a non-frozen collection
	 *
	 * @tags Collection
	 * @name DeleteCollection
	 * @summary Delete Collection
	 * @request DELETE:/api/collection/{collection_id}
	 */
	deleteCollection = (collectionId: string, params: RequestParams = {}) =>
		this.http.request<CollectionRead, HTTPValidationError>({
			path: `/api/collection/${collectionId}`,
			method: 'DELETE',
			format: 'json',
			...params
		});
	/**
	 * No description
	 *
	 * @tags Event
	 * @name CreateEvent
	 * @summary Create Event
	 * @request POST:/api/event
	 */
	createEvent = (data: EventCreate, params: RequestParams = {}) =>
		this.http.request<EventRead, HTTPValidationError>({
			path: `/api/event`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			format: 'json',
			...params
		});
	/**
	 * No description
	 *
	 * @tags Event
	 * @name ReadEvent
	 * @summary Read Event
	 * @request GET:/api/event/{event_id}
	 */
	readEvent = (eventId: string, params: RequestParams = {}) =>
		this.http.request<EventRead, HTTPValidationError>({
			path: `/api/event/${eventId}`,
			method: 'GET',
			format: 'json',
			...params
		});
	/**
	 * @description You can only update a non-frozen event
	 *
	 * @tags Event
	 * @name UpdateEvent
	 * @summary Update Event
	 * @request PUT:/api/event/{event_id}
	 */
	updateEvent = (eventId: string, data: EventUpdate, params: RequestParams = {}) =>
		this.http.request<EventRead, HTTPValidationError>({
			path: `/api/event/${eventId}`,
			method: 'PUT',
			body: data,
			type: ContentType.Json,
			format: 'json',
			...params
		});
	/**
	 * @description You can only delete a non-frozen event
	 *
	 * @tags Event
	 * @name DeleteEvent
	 * @summary Delete Event
	 * @request DELETE:/api/event/{event_id}
	 */
	deleteEvent = (eventId: string, params: RequestParams = {}) =>
		this.http.request<EventRead, HTTPValidationError>({
			path: `/api/event/${eventId}`,
			method: 'DELETE',
			format: 'json',
			...params
		});
	/**
	 * @description You can only attach an entity to an non-frozen event
	 *
	 * @tags Event
	 * @name AttachEntity
	 * @summary Attach Entity
	 * @request POST:/api/event/{event_id}/entity/{entity_id}
	 */
	attachEntity = (eventId: string, entityId: string, params: RequestParams = {}) =>
		this.http.request<EventRead, HTTPValidationError>({
			path: `/api/event/${eventId}/entity/${entityId}`,
			method: 'POST',
			format: 'json',
			...params
		});
	/**
	 * @description You can only detach an entity from an non-frozen event
	 *
	 * @tags Event
	 * @name DetachEntity
	 * @summary Detach Entity
	 * @request DELETE:/api/event/{event_id}/entity/{entity_id}
	 */
	detachEntity = (eventId: string, entityId: string, params: RequestParams = {}) =>
		this.http.request<EventRead, HTTPValidationError>({
			path: `/api/event/${eventId}/entity/${entityId}`,
			method: 'DELETE',
			format: 'json',
			...params
		});
	/**
	 * @description You can only add a link to an non-frozen event
	 *
	 * @tags Event
	 * @name LinkEvent
	 * @summary Link Event
	 * @request POST:/api/event/{event_id}/link/{event_to_link_id}
	 */
	linkEvent = (eventId: string, eventToLinkId: string, params: RequestParams = {}) =>
		this.http.request<EventRead, HTTPValidationError>({
			path: `/api/event/${eventId}/link/${eventToLinkId}`,
			method: 'POST',
			format: 'json',
			...params
		});
	/**
	 * @description You can only remove a link from an non-frozen event
	 *
	 * @tags Event
	 * @name UnlinkEvent
	 * @summary Unlink Event
	 * @request DELETE:/api/event/{event_id}/link/{event_to_unlink_id}
	 */
	unlinkEvent = (eventId: string, eventToUnlinkId: string, params: RequestParams = {}) =>
		this.http.request<EventRead, HTTPValidationError>({
			path: `/api/event/${eventId}/link/${eventToUnlinkId}`,
			method: 'DELETE',
			format: 'json',
			...params
		});

	/**
	 * @description You can only attach a file to an non-frozen event
	 *
	 * @tags Event
	 * @name AddAttachment
	 * @summary Add Attachment
	 * @request POST:/api/event/{event_id}/attachment
	 */
	addAttachment = (
		eventId: string,
		data: BodyAddAttachmentApiEventEventIdAttachmentPost,
		params: RequestParams = {}
	) =>
		this.http.request<EventRead, HTTPValidationError>({
			path: `/api/event/${eventId}/attachment`,
			method: 'POST',
			body: data,
			type: ContentType.FormData,
			format: 'json',
			...params
		});
	/**
	 * @description You can only remove a file from an non-frozen event
	 *
	 * @tags Event
	 * @name RemoveAttachment
	 * @summary Remove Attachment
	 * @request DELETE:/api/event/{event_id}/attachment/{attachment_id}
	 */
	removeAttachment = (eventId: string, attachmentId: string, params: RequestParams = {}) =>
		this.http.request<EventRead, HTTPValidationError>({
			path: `/api/event/${eventId}/attachment/${attachmentId}`,
			method: 'DELETE',
			format: 'json',
			...params
		});
	/**
	 * No description
	 *
	 * @tags Entity
	 * @name ListEntities
	 * @summary List Entities
	 * @request GET:/api/entity
	 */
	listEntities = (params: RequestParams = {}) =>
		this.http.request<EntityRead[], any>({
			path: `/api/entity`,
			method: 'GET',
			format: 'json',
			...params
		});
	/**
	 * No description
	 *
	 * @tags Entity
	 * @name CreateEntity
	 * @summary Create Entity
	 * @request POST:/api/entity
	 */
	createEntity = (data: AnyEntity, params: RequestParams = {}) =>
		this.http.request<EntityRead, HTTPValidationError>({
			path: `/api/entity`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			format: 'json',
			...params
		});
	/**
	 * No description
	 *
	 * @tags Entity
	 * @name SearchEntities
	 * @summary Search Entities
	 * @request GET:/api/entity/search
	 */
	searchEntities = (
		query: { name: string; discriminator?: EntityType; limit?: number },
		params: RequestParams = {}
	) =>
		this.http.request<EntityRead[], HTTPValidationError>({
			path: `/api/entity/search`,
			method: 'GET',
			query: query,
			format: 'json',
			...params
		});
}
