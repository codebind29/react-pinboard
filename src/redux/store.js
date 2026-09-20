import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/searchSlice";
import collectionReducer from './features/collectionSlice'

const store = configureStore({
  reducer: {
    search: searchReducer,
    collection : collectionReducer,
  },
});

export default store;