import React from "react";
import styles from "./Link.module.css";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const Link: React.FC<LinkProps> = ({ href, children, disabled, ...props }) => {
  return (
    <a
      href={disabled ? undefined : href}
      className={`${styles.link} ${disabled ? styles.disabled : ""}`}
      onClick={(e) => disabled && e.preventDefault()}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      {children}
    </a>
  );
};

export default Link;
