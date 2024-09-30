import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { commentsApiSlice } from "@/features/comments/commentsApiSlice"

import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import { commentsSlice } from "@/features/comments/commentsSlice"

const persistConfig = {
  key: "root",
  storage,
  version: 1,
}

const rootReducer = combineSlices(commentsApiSlice, commentsSlice)
const persistedReducer = persistReducer(persistConfig, rootReducer)

export type RootState = ReturnType<typeof rootReducer>
export type PersistState = ReturnType<typeof persistedReducer>

export const makeStore = (preloadedState?: Partial<PersistState>) => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }).concat(commentsApiSlice.middleware),
    // preloadedState,
  })
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>

export const persistor = persistStore(store)
