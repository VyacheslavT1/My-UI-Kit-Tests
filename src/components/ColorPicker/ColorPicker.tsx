import React, { useState } from "react";
import { useLazySVG } from "../../hooks/useLazySVG";
import styles from "./ColorPicker.module.css";

export interface ColorPickerProps {
  colors: string[];
  onSelect: (color: string) => void;
  label: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  onSelect,
  label,
}) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const ColorIcon = useLazySVG("assets/icons/color.svg?react") as React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  const SelectedColorIcon = useLazySVG(
    "assets/icons/color-selected.svg?react"
  ) as React.FC<React.SVGProps<SVGSVGElement>>;

  const handleSelect = (color: string) => {
    setSelectedColor(color);
    onSelect(color);
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.label}>{label}</h3>
      <div className={styles.palette}>
        {colors.map((color) => {
          const Icon = selectedColor === color ? SelectedColorIcon : ColorIcon;

          if (!Icon) return null;
          return (
            Icon && (
              <span
                key={color}
                role="img"
                aria-label={`Color ${color}`}
                className={`${styles.icon} ${
                  selectedColor === color ? styles.selected : ""
                }`}
                onClick={() => handleSelect(color)}
              >
                <Icon style={{ color }} />
              </span>
            )
          );
        })}
      </div>
    </div>
  );
};

export default ColorPicker;
