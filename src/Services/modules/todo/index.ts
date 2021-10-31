import { api } from '../../api'
import find from './find'
import update from './update'
import create from './create'

export const todoApi = api.injectEndpoints({
  endpoints: build => ({
    find: find(build),
    create: create(build),
    update: update(build),
  }),
  overrideExisting: true,
})

export const {
  useLazyFindQuery,
  useFindQuery,
  useCreateMutation,
  useUpdateMutation,
} = todoApi

export type Todo = {
  id?: string
  name: string
}
