import { configureStore } from '@reduxjs/toolkit'
import authenticationSlice from './authentication/authentication.slice'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { pkceApi } from './authentication/authentication.pkce'

export default configureStore({
    reducer: {
        auth: authenticationSlice,
        [pkceApi.reducerPath]: pkceApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pkceApi.middleware),
})