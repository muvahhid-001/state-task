import styles from "./Indicator.module.scss";

type IndicatorProps = {
  count: number;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
  height: number;
  orientation: string;
};

export const Indicator = ({
  count,
  onClick,
  isActive,
  className,
  height,
  orientation,
}: IndicatorProps) => {
  if (count === 0) return null;

  return (
    <span
      onClick={onClick}
      className={`${styles.indicator} ${isActive ? styles.active : ""} ${
        className ?? ""
      } ${height <= 42 && orientation === "left" ? styles.position : ""}`}
    >
      {isActive ? `+${count}` : count}
    </span>
  );
};
