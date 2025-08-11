import React from "react";
import styles from "./DotsButton.module.scss";

type Orientation = "up" | "down" | "left" | "note";

interface DotsButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  orientation?: Orientation;
}

export const DotsButton: React.FC<DotsButtonProps> = ({
  orientation,
  ...props
}) => {
  const buttonClass = `${styles.button} ${
    orientation === "up" ? styles.buttonUp : ""
  }`;

  return (
    <button
      className={buttonClass}
      {...props}
      type={props.type || "button"}
      aria-label="Открыть меню"
    >
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
    </button>
  );
};
