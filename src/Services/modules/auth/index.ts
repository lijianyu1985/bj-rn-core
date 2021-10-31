import { api } from '../../api'
import login from './login'
import verifyToken from './verifyToken'

export const todoApi = api.injectEndpoints({
  endpoints: build => ({
    login: login(build),
    verifyToken: verifyToken(build),
  }),
  overrideExisting: false,
})

export const {
  useLoginMutation,
  useVerifyTokenQuery,
  useLazyVerifyTokenQuery,
} = todoApi

export type Login = {
  username: string
  password: string
}

export type LoginResult = {
  accessToken: string
  currentAuthority: string[]
}
