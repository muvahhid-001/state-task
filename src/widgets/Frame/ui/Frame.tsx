import { useMemo } from "react";
import { PreviewFrame } from "@entities/Blocks/ui/PreviewFrame/PreviewFrame";
import { useAppSelector } from "@/shared/hooks";
import { selectBlocks } from "@entities/Blocks/model/blockSlice";
import { ErrorBoundary } from "@/shared/ui/ErrorBoundary/ErrorBoundary";
import { Fallback } from "@/shared/ui/Fallback/Fallback";
import { DevControls } from "@features/DevControl/DevControl";

import styles from "./Frame.module.scss";

export const Frame = () => {
  const blocks = useAppSelector(selectBlocks);

  const groupedBlocks = useMemo(
    () => ({
      note: blocks.filter((b) => b.orientation === "note"),
      left: blocks.filter((b) => b.orientation === "left"),
      down: blocks.filter((b) => b.orientation === "down"),
      up: blocks.filter((b) => b.orientation === "up"),
    }),
    [blocks]
  );

  const renderFrame = (
    orientation: keyof typeof groupedBlocks,
    message: string
  ) => {
    const group = groupedBlocks[orientation];
    if (group.length === 0) return null;

    return (
      <ErrorBoundary fallback={<Fallback message={message} />}>
        <PreviewFrame blocks={group} />
      </ErrorBoundary>
    );
  };

  return (
    <section className={styles.section}>
      <div className={styles.columns}>
        {renderFrame("note", "Ошибка в Note")}
        {renderFrame("left", "Ошибка в Left")}
        {renderFrame("down", "Ошибка в Down")}
        {renderFrame("up", "Ошибка в Up")}
      </div>
      <DevControls />
    </section>
  );
};
