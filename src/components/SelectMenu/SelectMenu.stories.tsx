import { Meta, StoryObj } from "@storybook/react";
import SelectMenu, { SelectMenuProps } from "./SelectMenu";
import { action } from "@storybook/addon-actions";

const meta: Meta<SelectMenuProps> = {
  title: "Select menu",
  component: SelectMenu,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Select menu label",
    },
    selectedTime: {
      control: "text",
      description: "Selected time HH:mm am/pm",
    },
    onTimeSelect: {
      action: "timeSelected",
      description: "Callback triggered when a time is selected",
    },
  },
};
export default meta;

type Story = StoryObj<SelectMenuProps>;

export const Default: Story = {
  args: {
    label: "Time",
    onTimeSelect: action("timeSelected"),
  },
};
