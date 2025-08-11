import { useState } from "react";
import type { FC } from "react";
import styles from "./SettingsBlock.module.scss";
import SelectView from "./SelectView";

interface SettingsBlockProps {
  onClose: () => void;
  onSave: () => void;
  isTextChanged: boolean;
  activeSettingsId: string;
}

const SettingsBlock: FC<SettingsBlockProps> = ({
  onClose,
  onSave,
  isTextChanged,
  activeSettingsId,
}) => {
  const [showSelectView, setShowSelectView] = useState(false);

  const toggleSelectView = () => {
    setShowSelectView((prev) => !prev);
  };

  return (
    <aside className={styles.aside}>
      {showSelectView && <SelectView activeSettingsId={activeSettingsId} />}
      <div className={styles.asideContent}>
        <button className={styles.close} onClick={onClose}>
          <img src="/images/close.svg" alt="Закрыть" />
        </button>
        <div className={styles.asideBlock}>
          <button className={styles.select} onClick={toggleSelectView}>
            <img src="/images/contentSelect.svg" alt="Выбрать Макет" />
          </button>
          <button
            className={`${styles.save} ${isTextChanged ? styles.active : ""}`}
            onClick={onSave}
          >
            <img src="/images/arrow.svg" alt="Сохранить" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SettingsBlock;
