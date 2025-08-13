import { useSelector } from "react-redux";
import type { FC, MouseEventHandler } from "react";
import styles from "./SelectView.module.scss";
import { selectBlocks } from "@entities/Blocks/model/blockSlice";
import { orientationMap } from "./lib/constants";
import type { Orientation } from "@entities/Blocks/model/blockSlice";

interface SelectViewProps {
  activeSettingsId: string;
  currentOrientation: Orientation;
  onSelect: () => void;
  onOrientationSelect: (orientation: Orientation) => void;
}

const SelectView: FC<SelectViewProps> = ({
  currentOrientation,
  onSelect,
  onOrientationSelect,
}) => {
  useSelector(selectBlocks);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const orientation = e.currentTarget.dataset.orientation as Orientation;
    onOrientationSelect(orientation);
    onSelect();
  };

  return (
    <aside className={styles.aside}>
      {Object.entries(orientationMap).map(([key, src]) => (
        <button
          key={key}
          data-orientation={key}
          className={`${styles.button} ${
            currentOrientation === key ? styles.active : ""
          }`}
          onClick={handleClick}
          type="button"
        >
          <img className={styles.img} src={src} alt="Иконка" />
        </button>
      ))}
    </aside>
  );
};

export default SelectView;
