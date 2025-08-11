import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Orientation = "left" | "up" | "down" | "note";

export type Frame = {
  id: string;
  text: string;
  image?: string;
  count: number;
  originalCount?: number;
  orientation: Orientation;
};

const initialState: Frame[] = [
  {
    id: "block-1",
    text: "quenching your thirst. It plays a cru",
    image:
      "https://images.unsplash.com/photo-1574610758891-5b809b6e6e2e?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    count: 10,
    originalCount: 10,
    orientation: "left",
  },
  {
    id: "block-2",
    text: "Drinking water isn't just about quenching",
    image:
      "https://images.unsplash.com/photo-1574610758891-5b809b6e6e2e?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    count: 1,
    originalCount: 1,
    orientation: "down",
  },
  {
    id: "block-3",
    text: "Drinking water isn't just about quenching your thirst. It plays a crucial role in maintaining the proper functioning of your",
    image:
      "https://images.wallpaperscraft.ru/image/single/pejzazh_art_luna_127187_2560x1440.jpg",
    count: 10,
    originalCount: 10,
    orientation: "left",
  },
  {
    id: "block-4",
    text: "Drinking water isn't just about quenching your thirst. It plays a crucial role in about quenchng bbb",
    image:
      "https://images.unsplash.com/photo-1574610758891-5b809b6e6e2e?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    count: 100,
    originalCount: 100,
    orientation: "left",
  },
  {
    id: "block-5",
    text: "Drinking water isn't just about quenching your thirst. It plays a crucial role in maintaining the proper functioning of your",
    image:
      "https://images.wallpaperscraft.ru/image/single/pejzazh_art_luna_127187_2560x1440.jpg",
    count: 10,
    originalCount: 9,
    orientation: "note",
  },
  {
    id: "block-6",
    text: "Drinking water isn't just about quenching your thirst. It plays a crucial role in maintaining the proper functioning of your body, and staying properly hydrated is vital",
    image:
      "https://images.wallpaperscraft.ru/image/single/pejzazh_art_luna_127187_2560x1440.jpg",
    count: 0,
    originalCount: 0,
    orientation: "up",
  },
  {
    id: "block-7",
    text: "Drinking water isn't just about quenching your thirst. It plays a crucial role in  in maintaining the a bbbbbbbbb",
    image:
      "https://images.wallpaperscraft.ru/image/single/pejzazh_art_luna_127187_2560x1440.jpg",
    count: 10,
    originalCount: 10,
    orientation: "left",
  },
  {
    id: "block-8",
    text: "Drinking water isn't just about quenching your thirst. It plays a crucial role in maintaining the proper functing of your body a bbbbbbbbb",
    image:
      "https://images.wallpaperscraft.ru/image/single/pejzazh_art_luna_127187_2560x1440.jpg",
    count: 10,
    originalCount: 10,
    orientation: "left",
  },
];

const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<{ id: string; count: number }>) => {
      const block = state.find((b) => b.id === action.payload.id);
      if (block) {
        block.count = action.payload.count;
      }
    },
    setOriginalCount: (
      state,
      action: PayloadAction<{ id: string; originalCount: number }>
    ) => {
      const block = state.find((b) => b.id === action.payload.id);
      if (block) {
        block.originalCount = action.payload.originalCount;
      }
    },
    setText: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const block = state.find((b) => b.id === action.payload.id);
      if (block) {
        block.text = action.payload.text;
      }
    },
    setOrientation: (
      state,
      action: PayloadAction<{ id: string; orientation: Orientation }>
    ) => {
      const block = state.find((b) => b.id === action.payload.id);
      if (block) {
        block.orientation = action.payload.orientation;
      }
    },
  },
});

export const { setCount, setOriginalCount, setText, setOrientation } =
  blocksSlice.actions;
export const selectBlocks = (state: { blocks: Frame[] }) => state.blocks;
export default blocksSlice.reducer;
