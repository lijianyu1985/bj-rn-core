import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Login, LoginResult } from '.'

export default (build: EndpointBuilder<any, any, any>) => {
  return build.mutation<LoginResult | undefined, Login>({
    query: body => ({
      url: '/auth/login',
      method: 'POST',
      body,
    }),
  })
}
