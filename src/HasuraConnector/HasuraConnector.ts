/**
 * TODO : test + handle errors.
 */
import { TConnector, TPageData } from 'makasi-core'

import {
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
	addPage: async (data) => {
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
		)?.data
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
	getPages: async (): Promise<TPageData[]> => {
		return (
			await doGRAPHQLQuery(
				getHasuraURL(domain),
				{ query: hasuraGetPagesQuery },
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
