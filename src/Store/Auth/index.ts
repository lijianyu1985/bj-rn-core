import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'auth',
  initialState: { accessToken: null } as AuthState,
  reducers: {
    setAuth: (state, { payload: { accessToken } }: AuthPayload) => {
      if (typeof accessToken !== 'undefined') {
        state.accessToken = accessToken
      }
    },
    clearAuth: state => {
      state.accessToken = undefined
    },
  },
})

export const { setAuth, clearAuth } = slice.actions

export default slice.reducer

export type AuthState = {
  accessToken: string | null | undefined
}

type AuthPayload = {
  payload: {
    accessToken: string | null | undefined
  }
}
