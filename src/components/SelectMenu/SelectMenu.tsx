import React, { useState, useEffect, useRef, useMemo } from "react";
import styles from "./SelectMenu.module.css";

export interface SelectMenuProps {
  label: string;
  selectedTime?: string;
  onTimeSelect: (time: string) => void;
}

const SelectMenu: React.FC<SelectMenuProps> = ({
  label,
  selectedTime,
  onTimeSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const timeOptions = useMemo(() => {
    const options: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = new Date();
        time.setHours(hour, minute, 0, 0);
        options.push(
          time
            .toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
              hourCycle: "h12",
            })
            .toLowerCase()
        );
      }
    }
    return options;
  }, []);

  const getClosestTime = () => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const roundedMinutes = Math.ceil(currentMinutes / 15) * 15;
    now.setHours(Math.floor(roundedMinutes / 60), roundedMinutes % 60, 0, 0);

    return now
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        hourCycle: "h12",
      })
      .toLowerCase();
  };

  const [defaultTime] = useState(getClosestTime());

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

  useEffect(() => {
    if (isOpen && listRef.current) {
      const closestIndex = timeOptions.findIndex(
        (time) => time === defaultTime
      );
      if (closestIndex !== -1) {
        listRef.current.scrollTo({
          top: closestIndex * 40,
          behavior: "smooth",
        });
      }
    }
  }, [isOpen, defaultTime, timeOptions]);
  const [selected, setSelected] = useState(selectedTime || defaultTime);
  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <h3 className={styles.label}>{label}</h3>
      <div className={styles.inputBox} onClick={() => setIsOpen(!isOpen)}>
        {selected}
      </div>

      {isOpen && (
        <div className={styles.menu} ref={listRef}>
          {timeOptions.map((time) => (
            <div
              key={time}
              className={styles.option}
              onClick={() => {
                setSelected(time);
                onTimeSelect(time);
                setIsOpen(false);
              }}
            >
              {time}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectMenu;
