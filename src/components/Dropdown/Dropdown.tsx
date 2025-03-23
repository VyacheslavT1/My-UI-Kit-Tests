import React, { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.css";

export interface DropdownProps {
  selectedOption?: "Week" | "Day";
  onSelect: (options: "Week" | "Day") => void;
  icon: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  selectedOption = "Week",
  onSelect,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<"Day" | "Week">(selectedOption);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const options: ("Day" | "Week")[] = ["Day", "Week"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div
        className={`${styles.inputBox} ${isOpen ? styles.active : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected} {<span className={styles.icon}>{icon}</span>}
      </div>

      {isOpen && (
        <div className={styles.menu}>
          {options.map((option) => (
            <div
              key={option}
              className={`${styles.option} ${
                selected === option ? styles.selected : ""
              }`}
              onClick={() => {
                setSelected(option);
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Dropdown;
