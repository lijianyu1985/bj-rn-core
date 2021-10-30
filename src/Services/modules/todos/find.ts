import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Todo } from '.'

export default (build: EndpointBuilder<any, any, any>) => {
  return build.query<Todo[], void>({
    query: () => '/todo/find',
  })
}
