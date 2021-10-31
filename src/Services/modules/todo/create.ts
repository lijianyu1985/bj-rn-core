import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Todo } from '.'

export default (build: EndpointBuilder<any, any, any>) => {
  return build.mutation<Todo, Todo>({
    query: body => ({
      url: '/todo/create',
      method: 'POST',
      body,
    }),
  })
}
