import styles from "./Indicator.module.scss";

type IndicatorProps = {
  count: number;
  onClick?: () => void;
  isActive?: boolean;
  right?: string;
  className?: string;
};

export const Indicator = ({
  count,
  onClick,
  isActive,
  right,
  className,
}: IndicatorProps) => {
  if (count === 0) return null;

  return (
    <p
      onClick={onClick}
      className={`${styles.indicator} ${isActive ? styles.active : ""} ${
        className ?? ""
      }`}
      style={right ? { right } : undefined}
    >
      {isActive ? `+${count}` : count}
    </p>
  );
};
