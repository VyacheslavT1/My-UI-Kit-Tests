import React, { useEffect } from "react";
import styles from "./Toast.module.css";
import CloseButton from "../../assets/icons/close.svg?react";
export interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  duration,
  onClose,
  ...props
}) => {
  useEffect(() => {
    if (onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={styles.toast} role="alert" {...props}>
      <p className={styles.message}>
        {message}
        <CloseButton
          className={styles.closeButton}
          onClick={onClose}
        ></CloseButton>
      </p>
    </div>
  );
};

export default Toast;
