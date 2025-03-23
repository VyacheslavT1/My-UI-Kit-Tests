import { Meta, StoryObj } from "@storybook/react";
import Button, { ButtonProps } from "./Button";
import PlayIcon from "../../assets/icons/play.svg?react";

const meta: Meta<ButtonProps> = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
      description: "Defines button style",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Locks the button, making it inactive",
    },
    icon: {
      description: "React-element icon (SVG)",
    },
    children: {
      description: "Button text",
    },
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    children: "Button",
    variant: "primary",
    disabled: false,
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    children: "Button",
    variant: "primary",
    icon: <PlayIcon />,
  },
};

export const Secondary: Story = {
  args: {
    children: "Button",
    variant: "secondary",
    disabled: false,
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    children: "Button",
    variant: "secondary",
    icon: <PlayIcon />,
  },
};
