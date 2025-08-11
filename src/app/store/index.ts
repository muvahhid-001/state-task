import { configureStore } from "@reduxjs/toolkit";
import blocksReducer from "@entities/Blocks/model/blockSlice";

export const store = configureStore({
  reducer: {
    blocks: blocksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
