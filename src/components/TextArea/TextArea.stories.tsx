import { Meta, StoryObj } from "@storybook/react";
import TextArea, { TextAreaProps } from "./TextArea";

const meta: Meta<TextAreaProps> = {
  title: "Text Area",
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Text area title",
    },
    value: {
      control: "text",
      description: "Text aria",
    },
    placeholder: {
      control: "text",
      description: "Text area placeholder",
    },
    rows: {
      control: "number",
      description: "Rows number in text area by default",
    },
    cols: {
      control: "number",
      description: "Defines text area width byb default",
    },
    autoResize: {
      control: "boolean",
      description: "Resize text area depending on text size",
    },
  },
};
export default meta;

type Story = StoryObj<TextAreaProps>;

export const Default: Story = {
  args: {
    title: "Description",
    value: "",
    placeholder: "Enter you text here",
    rows: 2,
    cols: 40,
    autoResize: true,
  },
};
