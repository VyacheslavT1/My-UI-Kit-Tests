import React, { useRef, useEffect } from "react";
import styles from "./TextArea.module.css";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  title: string;
  value: string;
  placeholder: string;
  rows: number;
  cols: number;
  autoResize: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  title,
  value,
  placeholder,
  rows,
  cols,
  autoResize = true,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (autoResize) {
      handleInput();
    }
  }, [autoResize, value]);

  return (
    <div className={styles.textareaContainer}>
      <h3 className={styles.title}>{title}</h3>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        onInput={handleInput}
        {...props}
      />
    </div>
  );
};
export default TextArea;
