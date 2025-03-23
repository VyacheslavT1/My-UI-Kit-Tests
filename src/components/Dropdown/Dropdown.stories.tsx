import { Meta, StoryObj } from "@storybook/react";
import Dropdown, { DropdownProps } from "./Dropdown";
import { action } from "@storybook/addon-actions";
import OpenMenuIcon from "../../assets/icons/down-small.svg?react";

const meta: Meta<DropdownProps> = {
  title: "Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  argTypes: {
    selectedOption: {
      control: "text",
      description: "Selected option",
    },
    onSelect: {
      action: "optionSelected",
      description: "Callback triggered when an option is selected",
    },
    icon: {
      description: "React-element icon (SVG)",
    },
  },
};

export default meta;

type Story = StoryObj<DropdownProps>;

export const Default: Story = {
  args: {
    onSelect: action("optionSelected"),
    icon: <OpenMenuIcon />,
  },
};
