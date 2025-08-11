export type Orientation = "left" | "up" | "down" | "note";

export type Frame = {
  id: string;
  text: string;
  image?: string;
  content?: {
    id: string;
    text: string;
    image?: string;
  };
  count: number;
  originalCount?: number;
  orientation: Orientation;
};

export type NoteFrameProps = {
  blocks: Frame[];
};

export type PreviewFrameProps = {
  blocks: Frame[];
};
