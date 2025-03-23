import { Meta, StoryObj } from "@storybook/react";
import InputField, { InputFieldProps, InputType } from "./InputField";

const meta: Meta<InputFieldProps> = {
  title: "Input Field",
  component: InputField,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Input field label",
    },
    value: { control: "text", description: "Input value" },
    onChange: { action: "changed", description: "Handle input change" },
    placeholder: { control: "text", description: "Input placeholder" },
    disabled: {
      control: "boolean",
      description: "Disable input field",
    },
    hasError: {
      control: "boolean",
      description: "Error input",
    },
  },
};
export default meta;

type Story = StoryObj<InputFieldProps>;

export const UsernameField: Story = {
  args: {
    label: "Username*",
    type: InputType.Text,
    value: "",
    placeholder: "Enter your username",
  },
};

export const PasswordField: Story = {
  args: {
    label: "Password*",
    type: InputType.Password,
    value: "",
    placeholder: "Enter your password",
  },
};
