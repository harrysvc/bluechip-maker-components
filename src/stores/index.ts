import logger from 'redux-logger';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import rootReducer from '@stores/reducers';
import rootSaga from '@stores/sagas';
import createSagaMiddleware from 'redux-saga';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    //NOTE: Must pass serivce's middleware here to make some effect work
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(sagaMiddleware);
    if (process.env.NODE_ENV === 'development') {
      return middleware.concat(logger);
    }
    return middleware;
  },
  devTools: process.env.NODE_ENV === 'development',
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultRootState extends AppState {}

  function useDispatch<TDispatch = AppDispatch>(): TDispatch;
}

export { store, persistor };
