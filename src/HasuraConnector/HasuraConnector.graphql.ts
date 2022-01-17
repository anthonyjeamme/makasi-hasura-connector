export const hasuraAddPageQuery = `mutation ($data: pages_insert_input!) {
    insert_pages(objects: [$data]) {
      returning {
        id
        is_published
        is_locked
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
      is_locked
      metadata
      sections
      slug
      resources{
        id
        data
        type
      }
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
    is_locked
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
      is_locked
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

export const hasuraAddResourceQuery = `mutation ($data: resources_insert_input!) {
  insert_resources(objects: [$data]) {
      returning {
        id
        type
        data
        created_at
        updated_at
      }
    }
  }`

export const hasuraGetResourceQuery = `query ($id: uuid) {
  resources(
      where: {id: {_eq: $id}}
  ){
    id
    type
    data
    created_at
    updated_at
  }
}`

export const hasuraUpdateResourceQuery = `mutation (
  $set_input: resources_set_input,
  $id: uuid
  ){
    update_resources(_set: $set_input, where: {id: {_eq: $id}}) {
      returning {
        id
        type
        data
        created_at
        updated_at
      }
    }
  }`

export const hasuraRemoveResourceQuery = `mutation (
  $id: uuid
  ){
      delete_resources(where: {id: {_eq: $id}}) {
        returning {
          id
        }
    }
  }`

export const hasuraAddResourceToPageQuery = `mutation ($data: page_resource_insert_input!) {
  insert_page_resource(objects: [$data]) {
      returning {
        id
      }
    }
  }`

export const hasuraRemovePageResource = `mutation(
    $page_id: uuid
    $resource_id: uuid
  ){
    delete_page_resource(where:{
      _and:{
        page_id:{
          _eq:$page_id
        },
        resource_id:{
          _eq: $resource_id
        }
      }
    }){
      returning{
        id
      }
    }
  }`
