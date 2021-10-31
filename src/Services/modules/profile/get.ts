import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Profile } from '.'

export default (build: EndpointBuilder<any, any, any>) => {
  return build.query<Profile, void>({
    query: () => '/account/profile',
  })
}
