import { Meta, StoryObj } from "@storybook/react";
import Modal, { ModalProps } from "./Modal";

const meta: Meta<ModalProps> = {
  title: "Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
      description: "Close the open modal ",
    },
    title: {
      control: { type: "text" },
      description: "Modal  title",
    },
    onClose: {
      action: "closed",
    },
    children: {
      description: "The contents of the modal",
    },
  },
};
export default meta;

type Story = StoryObj<ModalProps>;

export const Default: Story = {
  args: {
    title: "Title",
    isOpen: true,
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    onClose: () => console.log("Modal closed"),
  },
};
