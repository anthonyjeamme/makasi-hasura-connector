export const doGRAPHQLQuery = async (
  url,
  { query, variables }: TDoGRAPHQLQueryProps,
  {
    bearerToken
  }: {
    bearerToken: string
  }
) => {
  var headers = new Headers()
  headers.append('Authorization', `Bearer ${bearerToken}`)
  headers.append('X-Hasura-Role', `admin`)

  const data = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables
    }),
    headers
  }).then((data) => data.json())

  if (data.errors) {
    throw data.errors
  }

  return data
}

type TDoGRAPHQLQueryProps = {
  query: string
  variables?: object
}

export const getHasuraURL = (domain: string) =>
  `https://${domain}.hasura.app/v1/graphql`
