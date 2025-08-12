import { useState } from "react";
import type { FC } from "react";
import styles from "./SettingsBlock.module.scss";
import SelectView from "./SelectView";
import { useSelector } from "react-redux";
import { selectBlocks } from "@entities/Blocks/model/blockSlice";
import { orientationMapIcons } from "./lib/constants";

interface SettingsBlockProps {
  onClose: () => void;
  onSave: () => void;
  isTextChanged: boolean;
  activeSettingsId: string;
}

const SettingsBlock: FC<SettingsBlockProps> = ({
  onClose,
  onSave,
  activeSettingsId,
}) => {
  const [showSelectView, setShowSelectView] = useState(false);
  const blocks = useSelector(selectBlocks);
  const activeBlock = blocks.find((b) => b.id === activeSettingsId);
  const currentImage = activeBlock
    ? orientationMapIcons[activeBlock.orientation]
    : "";

  const toggleSelectView = () => {
    setShowSelectView((prev) => !prev);
  };

  const image = activeBlock?.image;
  const isActive =
    image === undefined || image === "" || image === "/images/noneImage.png";

  return (
    <aside className={styles.aside}>
      {showSelectView && <SelectView activeSettingsId={activeSettingsId} />}
      <div className={styles.asideContent}>
        <button className={styles.close} onClick={onClose}>
          <img src="/images/close.svg" alt="Закрыть" />
        </button>
        <div className={styles.asideBlock}>
          <button className={styles.select} onClick={toggleSelectView}>
            <img
              src={currentImage}
              alt="Выбрать Макет"
              className={
                activeBlock?.orientation === "left"
                  ? styles.imageLeft
                  : styles.imageDefault
              }
            />
          </button>
          <button
            className={`${styles.save} ${isActive ? styles.active : ""}`}
            onClick={onSave}
            disabled={isActive}
          >
            <img src="/images/arrow.svg" alt="Сохранить" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SettingsBlock;
