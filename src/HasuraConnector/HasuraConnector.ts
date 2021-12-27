/**
 * TODO : test + handle errors.
 */
import { TConnector, TPageData } from 'makasi-core'

import {
	getFilteredHasuraGetPagesQuery,
	hasuraAddPageQuery,
	hasuraGetPageQuery,
	hasuraGetPagesQuery,
	hasuraRemovePageQuery,
	hasuraUpdatePageQuery
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
		)?.data
	}
})
