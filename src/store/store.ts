import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { permissionApi } from "../api/Permission.api";
import { accountApi } from "../api/Account.api";
import { roleApi } from "../api/Role.api";

// import { queryMessageHandler } from './middlewares/queryMessagesHandler';

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      [permissionApi.reducerPath]: permissionApi.reducer,
      [accountApi.reducerPath]: accountApi.reducer,
      [roleApi.reducerPath]: roleApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        permissionApi.middleware,
        accountApi.middleware,
        roleApi.middleware
      ),
    ...options,
  });

export const store = createStore();

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
