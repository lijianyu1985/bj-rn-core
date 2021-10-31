import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { File } from '.'

export default (build: EndpointBuilder<any, any, any>) => {
  return build.mutation<File, FormData>({
    query: body => ({
      url: '/file/upload',
      method: 'POST',
      body,
    }),
  })
}
