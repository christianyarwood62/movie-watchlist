import { combineReducers, configureStore } from "@reduxjs/toolkit";
import watchReducer from "./features/watchSlice";
import movieReducer from "./features/movieSlice";
import authReducer from "./features/authSlice";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  watchList: watchReducer,
  movieList: movieReducer,
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "watchList"], // 👈 exclude movieList
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
