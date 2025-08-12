import React, { useMemo, useRef, useState, useEffect } from "react";
import { DotsButton } from "@/shared/ui/DotsButton/DotsButton";
import { Indicator } from "@/shared/ui/Indicator/Indicator";
import { usePreviewFrame } from "./hooks/usePreviewFrame";
import type { PreviewFrameProps } from "@/entities/Blocks/model/types";
import SettingsBlock from "../SettingsBlock/SettingsBlock";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./PreviewFrame.module.scss";

export const PreviewFrame = (props: PreviewFrameProps) => {
  const {
    blocks,
    activeSettingsId,
    draftText,
    toggleSettings,
    handleTextChange,
    handleSaveSettings,
    handleCloseSettings,
    isTextChanged,
    handleCountChange,
    textareaRefs,
  } = usePreviewFrame(props);

  const titleRefs = useRef<Record<string, HTMLParagraphElement | null>>({});
  const [heights, setHeights] = useState<Record<string, number>>({});

  useEffect(() => {
    const newHeights: Record<string, number> = {};
    blocks.forEach((block) => {
      const el = titleRefs.current[block.id];
      if (el) {
        newHeights[block.id] = el.getBoundingClientRect().height;
      }
    });
    setHeights(newHeights);
  }, [blocks, draftText, activeSettingsId]);

  const blocksMapped = useMemo(() => {
    return blocks.map((block) => {
      const isChanged =
        block.originalCount !== undefined &&
        block.count !== block.originalCount;
      const isSettingsVisible = activeSettingsId.includes(block.id);

      const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSaveSettings();
        }
      };

      return (
        <React.Fragment key={block.id}>
          {isSettingsVisible && (
            <SettingsBlock
              onClose={() => handleCloseSettings(block.id)}
              onSave={handleSaveSettings}
              isTextChanged={isTextChanged(block.id)}
              activeSettingsId={block.id}
            />
          )}
          <div
            className={`${styles.PreviewFrameListBlock} ${
              styles[`orientation_${block.orientation}`]
            } ${isSettingsVisible ? styles.settings : ""}`}
          >
            {["up", "left", "note", "down"].includes(block.orientation) &&
              block.image?.trim() && (
                <img
                  src={block.image}
                  alt="Фото Заметки"
                  className={styles.PreviewFrameListImage}
                />
              )}

            {isSettingsVisible ? (
              <TextareaAutosize
                name={`text-${block.id}`}
                ref={(el) => {
                  textareaRefs.current[block.id] = el;
                }}
                className={styles.editableTextArea}
                value={draftText[block.id] ?? ""}
                placeholder="Напишите вашу идею!"
                onChange={(e) => handleTextChange(block.id, e.target.value)}
                onKeyDown={handleKeyDown}
                minRows={1}
                // автофокус переносится в хук
              />
            ) : (
              <p
                className={styles.PreviewFrameListTitle}
                ref={(el) => {
                  titleRefs.current[block.id] = el;
                }}
              >
                {block.text.trim() !== "" ? (
                  block.text
                ) : (
                  <span style={{ color: "#b7b7b7ab" }}>
                    Напишите вашу идею!
                  </span>
                )}
                {!isSettingsVisible && (
                  <Indicator
                    count={block.count}
                    isActive={isChanged}
                    orientation={block.orientation}
                    height={heights[block.id] ?? undefined}
                    onClick={() => handleCountChange(block.id, block.count + 1)}
                    className={`${
                      block.orientation === "down"
                        ? styles.indicatorDown
                        : block.orientation === "up"
                        ? styles.indicatorTheme
                        : ""
                    }`}
                  />
                )}
              </p>
            )}
            {!isSettingsVisible && (
              <DotsButton
                onClick={() => toggleSettings(block.id)}
                orientation={block.orientation}
              />
            )}
          </div>
        </React.Fragment>
      );
    });
  }, [
    blocks,
    activeSettingsId,
    draftText,
    handleTextChange,
    handleCloseSettings,
    handleSaveSettings,
    isTextChanged,
    toggleSettings,
    handleCountChange,
    heights,
    textareaRefs,
  ]);

  return <div className={styles.PreviewFrameList}>{blocksMapped}</div>;
};
