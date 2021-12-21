import { configureStore } from '@reduxjs/toolkit'; 
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const store = configureStore({
    reducer: {
        therapy: reducers,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .prepend(
        reduxThunk
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;