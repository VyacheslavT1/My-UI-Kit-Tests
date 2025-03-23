import { Meta, StoryObj } from "@storybook/react";
import Toast, { ToastProps } from "./Toast";

const meta: Meta<ToastProps> = {
  title: "Toast",
  component: Toast,
  parameters: {
    actions: { argTypesRegex: "^on.*" },
  },
  tags: ["autodocs"],
  argTypes: {
    duration: {
      control: { type: "number" },
      description: "Define toast show duration",
    },
    message: {
      control: { type: "text" },
      description: "Toast message",
    },
    onClose: {
      action: "closed",
      description: "Callback function triggered when the toast is closed.",
    },
  },
};
export default meta;

type Story = StoryObj<ToastProps>;

export const Default: Story = {
  args: {
    message: "Event deleted",
    duration: 3000,
    onClose: () => console.log("Toast closed"),
  },
};
