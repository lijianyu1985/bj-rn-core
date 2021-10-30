import { api } from '../../api'
import find from './find'

export const todoApi = api.injectEndpoints({
  endpoints: build => ({
    find: find(build),
  }),
  overrideExisting: false,
})

export const { useLazyFindQuery, useFindQuery } = todoApi

export type Todo = {
  id: number
  name: string
}
