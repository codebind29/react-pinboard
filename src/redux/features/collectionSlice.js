import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("collection")) || [],
  notification: null,
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addCollection: (state, action) => {
      const alreadyExists = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (!alreadyExists) {
        state.items.push(action.payload);
        localStorage.setItem("collection", JSON.stringify(state.items));
        state.notification = {
          message: "Added to collection",
          type: "success",
        };
      }
    },
    removeCollection: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("collection", JSON.stringify(state.items));
      state.notification = {
        message: "Removed from collection",
        type: "error",
      };
    },
    clearCollection: (state) => {
      state.items = [];
      localStorage.removeItem("collection");
      state.notification = { message: "Collection cleared", type: "error" };
    },
    dismissNotification: (state) => {
      state.notification = null;
    },
  },
});

export const {
  addCollection,
  removeCollection,
  clearCollection,
  dismissNotification,
} = collectionSlice.actions;

export default collectionSlice.reducer;
