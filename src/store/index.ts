import { userReducer } from "./slices/user.slice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
// Kết hợp reducer
const rootReducer = combineReducers({
  userStore: userReducer,
});

// Xuất ra store type
export type StoreType = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
      serializableCheck: false,
    }).concat(logger),
});

// export default store;
