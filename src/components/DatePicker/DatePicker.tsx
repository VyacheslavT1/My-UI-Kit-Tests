import React, { useState } from "react";
import styles from "./DatePicker.module.css";

const SHORT_WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export interface DatePickerProps {
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
  prevIcon: React.ReactNode;
  nextIcon: React.ReactNode;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateSelect,
  prevIcon,
  nextIcon,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selected, setSelected] = useState<Date | null>(
    selectedDate instanceof Date ? selectedDate : null
  );

  const handlePrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const handleDateSelect = (date: Date) => {
    setSelected(date);
    onDateSelect(date);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthLastDate = new Date(year, month, 0).getDate();

    const prevMonthDays = Array.from({ length: firstDay }, (_, i) => ({
      date: new Date(year, month - 1, prevMonthLastDate - firstDay + i + 1),
      disabled: true,
    }));

    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
      date: new Date(year, month, i + 1),
      disabled: false,
    }));

    const remainingDays =
      7 - ((prevMonthDays.length + currentMonthDays.length) % 7);
    const nextMonthDays =
      remainingDays < 7
        ? Array.from({ length: remainingDays }, (_, i) => ({
            date: new Date(year, month + 1, i + 1),
            disabled: true,
          }))
        : [];

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className={styles.datePicker}>
      <div className={styles.header}>
        <span>
          {currentMonth.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <div className={styles.controls}>
          <button onClick={handlePrevMonth}>{prevIcon}</button>
          <button onClick={handleNextMonth}>{nextIcon}</button>
        </div>
      </div>
      <div className={styles.calendar}>
        {SHORT_WEEK_DAYS.map((day, index) => (
          <div key={index} className={styles.dayLabel}>
            {day}
          </div>
        ))}
        {days.map((day) => (
          <div
            key={day.date.toISOString()}
            className={`${styles.day} ${day.disabled ? styles.disabled : ""}${
              selected?.toDateString() === day.date.toDateString()
                ? styles.selected
                : ""
            }`}
            onClick={() => !day.disabled && handleDateSelect(day.date)}
          >
            {day.date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};
export default DatePicker;
