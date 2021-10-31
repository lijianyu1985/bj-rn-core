import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'auth',
  initialState: { accessToken: null, currentAuthority: [] } as AuthState,
  reducers: {
    setAuth: (
      state,
      { payload: { accessToken, currentAuthority } }: AuthPayload,
    ) => {
      if (typeof accessToken !== 'undefined') {
        state.accessToken = accessToken
        state.currentAuthority = currentAuthority
      }
    },
    clearAuth: state => {
      state.accessToken = undefined
      state.currentAuthority = undefined
    },
  },
})

export const { setAuth, clearAuth } = slice.actions

export default slice.reducer

export type AuthState = {
  accessToken: string | null | undefined
  currentAuthority: string[] | null | undefined
}

type AuthPayload = {
  payload: {
    accessToken: string | null | undefined
    currentAuthority: string[] | null | undefined
  }
}
