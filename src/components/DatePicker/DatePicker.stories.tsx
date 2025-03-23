import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import DatePicker, { DatePickerProps } from "./DatePicker";
import Next from "../../assets/icons/chevron-right.svg?react";
import Prev from "../../assets/icons/chevron-left.svg?react";

const meta: Meta<DatePickerProps> = {
  title: "Date Picker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {
    selectedDate: {
      control: "date",
      description: "Pre-selected date in the calendar",
    },
    onDateSelect: {
      action: "changed",
      description: "Callback triggered when a date is selected",
    },
    prevIcon: {
      description: "React-element icon (SVG) for previous month",
    },
    nextIcon: {
      description: "React-element icon (SVG) for next month",
    },
  },
};
export default meta;

type Story = StoryObj<DatePickerProps>;

export const Default: Story = {
  args: {
    selectedDate: new Date(),
    onDateSelect: action("Date selected"),
    prevIcon: <Prev />,
    nextIcon: <Next />,
  },
};
