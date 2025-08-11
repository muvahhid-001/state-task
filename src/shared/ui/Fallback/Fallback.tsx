import styles from "./Fallback.module.scss";

interface FallbackProps {
  message: string;
}

export const Fallback = ({ message }: FallbackProps) => (
  <div className={styles.fallback}>
    <p className={styles.fallbackP}>{message}</p>
  </div>
);
