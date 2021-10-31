import { api } from '../../api'
import get from './get'
import update from './update'
import updateAvatarUrl from './updateAvatarUrl'

export const profileApi = api.injectEndpoints({
  endpoints: build => ({
    get: get(build),
    update: update(build),
    updateAvatarUrl: updateAvatarUrl(build),
  }),
  overrideExisting: true,
})

export const {
  useLazyGetQuery,
  useUpdateMutation,
  useUpdateAvatarUrlMutation,
} = profileApi

export type Profile = {
  id: string
  username: string
  roles: string[]
  name: string
  phone: string
  avatarUrl: string
}

export type ProfileAvatarUrl = {
  avatarUrl: string
}
