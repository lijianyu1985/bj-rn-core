import { api } from '../../api'
import upload from './upload'

export const fileApi = api.injectEndpoints({
  endpoints: build => ({
    upload: upload(build),
  }),
  overrideExisting: false,
})

export const { useUploadMutation } = fileApi

export type File = {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}
