/**
 * TODO : test + handle errors.
 */
import { TConnector, TPageData } from 'makasi-core'

import {
	getFilteredHasuraGetPagesQuery,
	hasuraAddPageQuery,
	hasuraAddResourceQuery,
	hasuraAddResourceToPageQuery,
	hasuraGetPageQuery,
	hasuraGetPagesQuery,
	hasuraGetResourceQuery,
	hasuraRemovePageQuery,
	hasuraRemovePageResource,
	hasuraRemoveResourceQuery,
	hasuraUpdatePageQuery,
	hasuraUpdateResourceQuery
} from './HasuraConnector.graphql'

import { doGRAPHQLQuery, getHasuraURL } from './HasuraConnector.utils'

export const hasuraConnector = (
	domain: string,
	bearerToken: string
): TConnector => ({
	//
	addPage: async (data): Promise<TPageData> => {
		const variables = {
			data
		}

		return (
			await doGRAPHQLQuery(
				getHasuraURL(domain),
				{
					query: hasuraAddPageQuery,
					variables
				},
				{ bearerToken }
			)
		)?.data?.insert_pages?.returning?.[0]
	},

	//
	getPage: async (id): Promise<TPageData> => {
		const variables = {
			id
		}

		const data = (
			await doGRAPHQLQuery(
				getHasuraURL(domain),
				{
					query: hasuraGetPageQuery,
					variables
				},
				{ bearerToken }
			)
		)?.data

		if (!data) return null

		return data.pages?.[0]
	},

	//
	getPages: async (type = null): Promise<TPageData[]> => {
		return (
			await doGRAPHQLQuery(
				getHasuraURL(domain),
				{
					query: type
						? getFilteredHasuraGetPagesQuery(type)
						: hasuraGetPagesQuery
				},
				{ bearerToken }
			)
		)?.data?.pages
	},

	//
	removePage: async (id) => {
		const variables = {
			id
		}

		return (
			await doGRAPHQLQuery(
				getHasuraURL(domain),
				{
					query: hasuraRemovePageQuery,
					variables
				},
				{ bearerToken }
			)
		)?.data
	},

	//
	updatePage: async (id, data) => {
		const variables = {
			set_input: data,
			id
		}

		return (
			await doGRAPHQLQuery(
				getHasuraURL(domain),
				{
					query: hasuraUpdatePageQuery,
					variables
				},
				{ bearerToken }
			)
		)?.data?.update_pages?.returning?.[0]
	},

	//
	addResource: async (data) => {
		const variables = {
			data
		}

		return (
			await doGRAPHQLQuery(
				getHasuraURL(domain),
				{
					query: hasuraAddResourceQuery,
					variables
				},
				{ bearerToken }
			)
		)?.data?.insert_resources?.returning?.[0]
	},

	//
	getResource: async (id) => {
		const variables = {
			id
		}

		const data = (
			await doGRAPHQLQuery(
				getHasuraURL(domain),
				{
					query: hasuraGetResourceQuery,
					variables
				},
				{ bearerToken }
			)
		)?.data

		if (!data) return null

		return data.resources?.[0]
	},

	//
	updateResource: async (id, data) => {
		const variables = {
			set_input: data,
			id
		}

		return (
			await doGRAPHQLQuery(
				getHasuraURL(domain),
				{
					query: hasuraUpdateResourceQuery,
					variables
				},
				{ bearerToken }
			)
		)?.data?.update_resources?.returning?.[0]
	},

	//
	removeResource: async (id) => {
		const variables = {
			id
		}

		return (
			await doGRAPHQLQuery(
				getHasuraURL(domain),
				{
					query: hasuraRemoveResourceQuery,
					variables
				},
				{ bearerToken }
			)
		)?.data?.delete_resources?.returning?.[0]
	},

	//
	addResourceToPage: async (resourceId, pageId) => {
		const variables = {
			data: {
				resourceId,
				pageId
			}
		}

		return (
			await doGRAPHQLQuery(
				getHasuraURL(domain),
				{
					query: hasuraAddResourceToPageQuery,
					variables
				},
				{ bearerToken }
			)
		)?.data?.insert_page_resource?.returning?.[0]
	},

	//
	removePageResource: async (resourceId, pageId) => {
		const variables = {
			resourceId,
			pageId
		}

		return (
			await doGRAPHQLQuery(
				getHasuraURL(domain),
				{
					query: hasuraRemovePageResource,
					variables
				},
				{ bearerToken }
			)
		)?.data?.delete_page_resource?.returning?.[0]
	}
})
