import { useSelector, useDispatch } from "react-redux";
import type { FC, MouseEventHandler } from "react";
import styles from "./SelectView.module.scss";
import {
  selectBlocks,
  setOrientation,
} from "@entities/Blocks/model/blockSlice";
import { orientationMap } from "./lib/constants";

interface SelectViewProps {
  activeSettingsId: string;
}

const SelectView: FC<SelectViewProps> = ({ activeSettingsId }) => {
  const dispatch = useDispatch();
  const blocks = useSelector(selectBlocks);
  const activeBlock = blocks.find((b) => b.id === activeSettingsId);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const orientation = e.currentTarget.dataset
      .orientation as keyof typeof orientationMap;
    if (activeBlock && orientation) {
      dispatch(setOrientation({ id: activeBlock.id, orientation }));
    }
  };

  return (
    <aside className={styles.aside}>
      {Object.entries(orientationMap).map(([key, src]) => (
        <button
          key={key}
          data-orientation={key}
          className={`${styles.button} ${
            activeBlock?.orientation === key ? styles.active : ""
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
