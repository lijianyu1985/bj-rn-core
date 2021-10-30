import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export default (build: EndpointBuilder<any, any, any>) => {
  return build.query<boolean | undefined, void>({
    query: () => '/auth/verifyToken',
  })
}
