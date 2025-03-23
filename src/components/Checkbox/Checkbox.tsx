import React, { useState } from "react";
import { useLazySVG } from "../../hooks/useLazySVG";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "labeled";
  label?: string;
  onCheck: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  variant = "default",
  label,
  onCheck,
  ...props
}) => {
  const [checked, setChecked] = useState(false);

  const CheckboxIcon = useLazySVG("assets/icons/checkbox-line.svg?react");
  const CheckboxCheckedIcon = useLazySVG(
    "assets/icons/checkbox-fill-green.svg?react"
  );

  const handleCheck = () => {
    setChecked((prev) => !prev);
    onCheck(!checked);
  };

  return (
    <label className={styles.label}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheck}
        className={styles.input}
        role="checkbox"
        aria-checked={checked}
        {...props}
      />
      {CheckboxIcon && CheckboxCheckedIcon && (
        <span role="img" aria-label="Checkbox icon" onClick={handleCheck}>
          {checked ? <CheckboxCheckedIcon /> : <CheckboxIcon />}
        </span>
      )}
      {variant === "labeled" && label && <span>{label}</span>}
    </label>
  );
};

export default Checkbox;
