import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slices/counterSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/rootSaga';
import equipmentSlice from './slices/equipmentSlice';
import loadingSlice from './slices/loadingSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    equipment: equipmentSlice,
    loading: loadingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([sagaMiddleware]),
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
