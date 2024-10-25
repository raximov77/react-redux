import { configureStore } from "@reduxjs/toolkit";
import crudSlice from "./slices/crudSlice";

const store = configureStore({
  reducer: {
    crud: crudSlice,
  },
});
export default store;
