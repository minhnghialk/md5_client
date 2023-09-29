import { userReducer } from "./slices/user.slice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Kết hợp reducer
const rootReducer = combineReducers({
  userStore: userReducer,
});

// Xuất ra store type
export type StoreType = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});

// export default store;
