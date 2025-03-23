import React, { useState } from "react";
import styles from "./InputField.module.css";
import EyeClose from "../../assets/icons/eye-close.svg?react";
import EyeOpen from "../../assets/icons/eye-open.svg?react";

export enum InputType {
  Text = "text",
  Password = "password",
}

export interface InputFieldProps {
  id: string;
  label: string;
  type: InputType;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = InputType.Text,
  value,
  onChange,
  placeholder,
  disabled = false,
  hasError = false,
  errorMessage = "Error message",
}) => {
  const [inputType, setInputType] = useState<InputType>(type);

  const isPassword = type === InputType.Password;
  const disabledClass = disabled
    ? isPassword
      ? styles.disabledPassword
      : styles.disabledUsername
    : "";

  const togglePasswordVisibility = () => {
    setInputType((prevType) =>
      prevType === InputType.Password ? InputType.Text : InputType.Password
    );
  };

  const Icon = inputType === InputType.Password ? EyeClose : EyeOpen;
  return (
    <div className={`${styles.inputField} ${disabledClass}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputContainer}>
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`${styles.input} ${hasError ? styles.error : ""}`}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
        />
        {isPassword && (
          <Icon
            className={`${styles.eyeIcon} ${disabledClass}`}
            onClick={!disabled ? togglePasswordVisibility : undefined}
            aria-label={
              inputType === InputType.Password
                ? "Show password"
                : "Hide password"
            }
          ></Icon>
        )}
      </div>
      {hasError && errorMessage && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
