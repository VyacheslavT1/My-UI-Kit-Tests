import { Meta, StoryObj } from "@storybook/react";
import ColorPicker, { ColorPickerProps } from "./ColorPicker";
import { action } from "@storybook/addon-actions";

const meta: Meta<ColorPickerProps> = {
  title: "ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  argTypes: {
    colors: { control: "object", description: "Array of color options" },
    onSelect: {
      action: "colorSelected",
      description: "Triggered when a color is selected",
    },
  },
};

export default meta;

type Story = StoryObj<ColorPickerProps>;

export const Default: Story = {
  args: {
    label: "Colors",
    colors: [
      "#9f2957",
      "#d90056",
      "#e25d33",
      "#dfc45a",
      "#b8c42f",
      "#15af6e",
      "#429488",
      "#397e4a",
      "#439bdf",
      "#4154ae",
      "#6c7ac4",
      "#8333a4",
    ],
    onSelect: action("colorSelected"),
  },
};
