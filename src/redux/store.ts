import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './slice/account.slice'
import permissionReducer from './slice/permission.slice'
import customerAccountReducer from './slice/customer.slide'

export const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerAccountReducer,
    permissions: permissionReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;