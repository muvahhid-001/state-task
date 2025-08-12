import React, { useMemo } from "react";
import { DotsButton } from "@/shared/ui/DotsButton/DotsButton";
import { Indicator } from "@/shared/ui/Indicator/Indicator";
import { usePreviewFrame } from "./hooks/usePreviewFrame";
import { getTitleClass } from "./lib/getTitleClass";
import type { PreviewFrameProps } from "@/entities/Blocks/model/types";
import SettingsBlock from "../SettingsBlock/SettingsBlock";
import styles from "./PreviewFrame.module.scss";

export const PreviewFrame = (props: PreviewFrameProps) => {
  const {
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
  } = usePreviewFrame(props);

  const blocksMapped = useMemo(() => {
    return blocks.map((block) => {
      const isChanged =
        block.originalCount !== undefined &&
        block.count !== block.originalCount;
      const titleClass = getTitleClass(block.count, block.originalCount);
      const isSettingsVisible = activeSettingsId === block.id;

      return (
        <React.Fragment key={block.id}>
          {isSettingsVisible && (
            <SettingsBlock
              onClose={handleCloseSettings}
              onSave={handleSaveSettings}
              isTextChanged={isTextChanged()}
              activeSettingsId={block.id}
            />
          )}
          <div
            className={`${styles.PreviewFrameListBlock} ${
              styles[`orientation_${block.orientation}`]
            } ${isSettingsVisible ? styles.settings : ""}`}
          >
            {block.orientation === "up" && block.image?.trim() && (
              <img
                src={block.image}
                alt="Фото Заметки"
                className={styles.PreviewFrameListImage}
              />
            )}
            <div className={styles.contentRow}>
              {block.orientation === "left" && block.image?.trim() && (
                <img
                  src={block.image}
                  alt="Фото Заметки"
                  className={styles.PreviewFrameListImage}
                />
              )}
              {isSettingsVisible ? (
                <textarea
                  ref={textareaRef}
                  className={styles.editableTextArea}
                  value={draftText}
                  placeholder="Напишите вашу идею"
                  onChange={(e) => handleTextChange(e.target.value)}
                  rows={1}
                />
              ) : (
                <p
                  className={`${styles.PreviewFrameListTitle} ${styles[titleClass]}`}
                >
                  {block.text}
                </p>
              )}
              {block.orientation === "note" && block.image?.trim() && (
                <img
                  src={block.image}
                  alt="Фото Заметки"
                  className={styles.PreviewFrameListImage}
                />
              )}
            </div>
            {block.orientation === "down" && block.image?.trim() && (
              <img
                src={block.image}
                alt="Фото Заметки"
                className={styles.PreviewFrameListImage}
              />
            )}
            {!isSettingsVisible && (
              <DotsButton
                onClick={() => toggleSettings(block.id)}
                orientation={block.orientation}
              />
            )}
            {!isSettingsVisible && (
              <Indicator
                count={block.count}
                isActive={isChanged}
                onClick={() => handleCountChange(block.id, block.count + 1)}
                right="12px"
                className={
                  block.orientation === "down"
                    ? styles.indicatorDown
                    : block.orientation === "up"
                    ? styles.indicatorTheme
                    : undefined
                }
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
  ]);

  return <div className={styles.PreviewFrameList}>{blocksMapped}</div>;
};
