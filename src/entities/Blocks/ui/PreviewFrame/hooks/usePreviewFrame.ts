import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHandleCountChange } from "./useHandleCountChange";
import { setText } from "@/entities/Blocks/model/blockSlice";
import type { PreviewFrameProps } from "@/entities/Blocks/model/types";
import type { Orientation } from "@/entities/Blocks/model/blockSlice";

export const usePreviewFrame = ({ blocks }: PreviewFrameProps) => {
  const dispatch = useDispatch();
  const handleCountChange = useHandleCountChange();

  const [activeSettingsId, setActiveSettingsId] = useState<string[]>([]);
  const [draftText, setDraftText] = useState<Record<string, string>>({});
  const [previewOrientations, setPreviewOrientations] = useState<
    Record<string, Orientation>
  >({});
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
    setDraftText({});
    setPreviewOrientations({});
  }, [activeSettingsId, draftText, dispatch]);

  const handleCloseSettings = useCallback((id: string) => {
    setActiveSettingsId((prev) => prev.filter((i) => i !== id));
    setDraftText((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
    setPreviewOrientations((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  }, []);

  const isTextChanged = useCallback(
    (id: string) => {
      const block = blocks.find((b) => b.id === id);
      const current = draftText[id]?.trim() ?? "";
      return current.length > 0 && block?.text !== current;
    },
    [blocks, draftText]
  );

  const handleOrientationPreview = useCallback(
    (id: string, orientation: Orientation) => {
      setPreviewOrientations((prev) => ({ ...prev, [id]: orientation }));
    },
    []
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
    previewOrientations,
    handleOrientationPreview,
  };
};
