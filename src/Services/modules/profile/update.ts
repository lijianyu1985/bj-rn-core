import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Profile } from '.'

export default (build: EndpointBuilder<any, any, any>) => {
  return build.mutation<Profile, Profile>({
    query: body => ({
      url: '/account/changeProfile',
      method: 'POST',
      body,
    }),
  })
}
