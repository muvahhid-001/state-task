import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHandleCountChange } from "./useHandleCountChange";
import { setText } from "@/entities/Blocks/model/blockSlice";
import type { PreviewFrameProps } from "@/entities/Blocks/model/types";

export const usePreviewFrame = ({ blocks }: PreviewFrameProps) => {
  const dispatch = useDispatch();
  const handleCountChange = useHandleCountChange();

  const [activeSettingsId, setActiveSettingsId] = useState<string | null>(null);
  const [draftText, setDraftText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (activeSettingsId) {
      const block = blocks.find((b) => b.id === activeSettingsId);
      setDraftText(block?.text ?? "");
    }
  }, [activeSettingsId, blocks]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [activeSettingsId, draftText]);

  const toggleSettings = useCallback((id: string) => {
    setActiveSettingsId((prev) => (prev === id ? null : id));
  }, []);

  const handleTextChange = useCallback((newText: string) => {
    setDraftText(newText);
  }, []);

  const handleSaveSettings = useCallback(() => {
    if (activeSettingsId) {
      dispatch(setText({ id: activeSettingsId, text: draftText }));
      setActiveSettingsId(null);
    }
  }, [activeSettingsId, draftText, dispatch]);

  const handleCloseSettings = useCallback(() => {
    setActiveSettingsId(null);
  }, []);

  const isTextChanged = useCallback(() => {
    if (!activeSettingsId) return false;
    const block = blocks.find((b) => b.id === activeSettingsId);
    return block?.text !== draftText;
  }, [activeSettingsId, blocks, draftText]);

  return {
    blocks,
    activeSettingsId,
    draftText,
    textareaRef,
    toggleSettings,
    handleTextChange,
    handleSaveSettings,
    handleCloseSettings,
    isTextChanged,
    handleCountChange,
  };
};
