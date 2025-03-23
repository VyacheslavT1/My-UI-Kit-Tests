import { Meta, StoryObj } from "@storybook/react";
import Checkbox, { CheckboxProps } from "./Checkbox";
import { action } from "@storybook/addon-actions";

const meta: Meta<CheckboxProps> = {
  title: "Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "labeled"],
      description: "Defines checkbox style",
    },
    label: {
      control: "text",
      description: "Text displayed next to checkbox (only for labeled variant)",
      if: { arg: "variant", eq: "labeled" },
    },
    onCheck: {
      action: "checked",
      description: "Triggered when checkbox is checked",
    },
  },
};
export default meta;

type Story = StoryObj<CheckboxProps>;

export const Default: Story = {
  args: {
    variant: "default",
    onCheck: action("checked"),
  },
};

export const Labeled: Story = {
  args: {
    variant: "labeled",
    label: "Text",
    onCheck: action("checked"),
  },
};
