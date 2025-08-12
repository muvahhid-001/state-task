import { PreviewFrame } from "@entities/Blocks/ui/PreviewFrame/PreviewFrame";
import { useAppSelector } from "@/shared/hooks";
import { selectBlocks } from "@entities/Blocks/model/blockSlice";
import { ErrorBoundary } from "@/shared/ui/ErrorBoundary/ErrorBoundary";
import { Fallback } from "@/shared/ui/Fallback/Fallback";
import { DevControls } from "@features/DevControl/DevControl";

import styles from "./Frame.module.scss";

export const Frame = () => {
  const blocks = useAppSelector(selectBlocks);
  const half = Math.ceil(blocks.length / 2);
  const firstHalf = blocks.slice(0, half);
  const secondHalf = blocks.slice(half);

  const renderFrame = (blocks: typeof firstHalf, message: string) => {
    if (blocks.length === 0) return null;

    return (
      <ErrorBoundary fallback={<Fallback message={message} />}>
        <PreviewFrame blocks={blocks} />
      </ErrorBoundary>
    );
  };

  return (
    <section className={styles.section}>
      <div className={styles.columns}>
        {renderFrame(firstHalf, "Ошибка в первой форме")}
        {renderFrame(secondHalf, "Ошибка во второй форме")}
      </div>
      <DevControls />
    </section>
  );
};
