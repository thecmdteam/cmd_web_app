import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authenticationSlice from './authentication/authentication.slice'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { pkceApi } from './authentication/authentication.pkce'

const rootReducers = combineReducers({
    auth: authenticationSlice,
    [pkceApi.reducerPath]: pkceApi.reducer
})

export default configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pkceApi.middleware),
})