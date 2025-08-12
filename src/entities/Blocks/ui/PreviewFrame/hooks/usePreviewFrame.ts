import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHandleCountChange } from "./useHandleCountChange";
import { setText } from "@/entities/Blocks/model/blockSlice";
import type { PreviewFrameProps } from "@/entities/Blocks/model/types";

export const usePreviewFrame = ({ blocks }: PreviewFrameProps) => {
  const dispatch = useDispatch();
  const handleCountChange = useHandleCountChange();

  const [activeSettingsId, setActiveSettingsId] = useState<string[]>([]);
  const [draftText, setDraftText] = useState<Record<string, string>>({});
  const textareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});

  useEffect(() => {
    activeSettingsId.forEach((id) => {
      const ref = textareaRefs.current[id];
      if (ref) {
        const length = ref.value.length;
        ref.focus();
        ref.setSelectionRange(length, length);
      }
    });
  }, [activeSettingsId]);

  useEffect(() => {
    activeSettingsId.forEach((id) => {
      const block = blocks.find((b) => b.id === id);
      if (block && draftText[id] === undefined) {
        setDraftText((prev) => ({ ...prev, [id]: block.text ?? "" }));
      }
    });
  }, [activeSettingsId, blocks, draftText]);

  const toggleSettings = useCallback((id: string) => {
    setActiveSettingsId((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const handleTextChange = useCallback((id: string, newText: string) => {
    setDraftText((prev) => ({ ...prev, [id]: newText }));
  }, []);

  const handleSaveSettings = useCallback(() => {
    activeSettingsId.forEach((id) => {
      dispatch(setText({ id, text: draftText[id] ?? "" }));
    });
    setActiveSettingsId([]);
  }, [activeSettingsId, draftText, dispatch]);

  const handleCloseSettings = useCallback((id: string) => {
    setActiveSettingsId((prev) => prev.filter((i) => i !== id));
  }, []);

  const isTextChanged = useCallback(
    (id: string) => {
      const block = blocks.find((b) => b.id === id);
      return block?.text !== draftText[id];
    },
    [blocks, draftText]
  );

  return {
    blocks,
    activeSettingsId,
    draftText,
    textareaRefs,
    toggleSettings,
    handleTextChange,
    handleSaveSettings,
    handleCloseSettings,
    isTextChanged,
    handleCountChange,
  };
};
