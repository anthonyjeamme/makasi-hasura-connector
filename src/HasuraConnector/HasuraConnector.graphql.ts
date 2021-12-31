export const hasuraAddPageQuery = `mutation ($data: pages_insert_input!) {
    insert_pages(objects: [$data]) {
      returning {
        id
        is_published
        metadata
        sections
        slug
      }
    }
  }`

export const hasuraGetPageQuery = `query ($id: uuid) {
    pages(
        where: {id: {_eq: $id}}
    ){
      id
      type
      is_published
      metadata
      sections
      slug
    }
  }`

export const getFilteredHasuraGetPagesQuery = (filter: string) => `query {
  pages(
    order_by:{
      created_at: desc
    },
    where:{
      type:{
        _eq: "${filter}"
      }
    }
  ){
    id
    type
    is_published
    metadata
    sections
    slug
  }
}`

export const hasuraGetPagesQuery = `query {
    pages(
      order_by:{
        created_at: desc
      }
    ){
      id
      type
      is_published
      metadata
      sections
      slug
    }
  }`

export const hasuraRemovePageQuery = `mutation (
    $id: uuid
    ){
        delete_pages(where: {id: {_eq: $id}}) {
        returning {
            id
        }
      }
    }`

export const hasuraUpdatePageQuery = `mutation (
    $set_input: pages_set_input,
    $id: uuid
    ){
      update_pages(_set: $set_input, where: {id: {_eq: $id}}) {
        returning {
          id
        }
      }
    }`
