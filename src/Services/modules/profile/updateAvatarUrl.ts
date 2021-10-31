import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Profile, ProfileAvatarUrl } from '.'

export default (build: EndpointBuilder<any, any, any>) => {
  return build.mutation<Profile, ProfileAvatarUrl>({
    query: body => ({
      url: '/account/changeProfile',
      method: 'POST',
      body,
    }),
  })
}
