import { TimeoutError } from '@/Common/Errors'
import { Config } from '@/Config'
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { showMessage } from 'react-native-flash-message'

const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.accessToken

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
  fetchFn: (info: RequestInfo | undefined, init: RequestInit | undefined) => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      //  const controller = new AbortController()

      //  // 5 second timeout:
      //  const timeoutId = setTimeout(() => controller.abort(), 5000)

      //  fetch(info as RequestInfo, { signal: controller.signal }).then(
      //    response => {
      //      // completed request before timeout fired

      //      // If you only wanted to timeout the request, not the response, add:
      //      clearTimeout(timeoutId)
      //      return resolve(response)
      //    },
      //    reject,
      //  )
      //  fetch(info as RequestInfo).then(resolve, reject)

      fetch(info as RequestInfo, init as RequestInit).then(resolve, reject)

      const error = new TimeoutError(5000)
      setTimeout(reject, 5000, error)
    })
  },
})

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  console.log(args)
  let result = await baseQuery(args, api, extraOptions)
  if (result.error) {
    if (result.error.status === 401 || result.error.status === 403) {
      //toast
      showMessage({
        message: "You don't have permission",
        type: 'danger',
      })
      // return false
    }
    //toast
    const errMsg =
      (result.error as any).error ||
      ((result.error as any).data && (result.error as any).data.message)
    showMessage({
      message: errMsg,
      type: 'danger',
    })
    throw errMsg
  }

  return result.data || {}
}

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
})
