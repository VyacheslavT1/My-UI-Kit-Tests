import { Meta, StoryObj } from "@storybook/react";
import Link, { LinkProps } from "./Link";

const meta: Meta<LinkProps> = {
  title: "Link",
  component: Link,
  tags: ["autodocs"],
  argTypes: {
    href: { control: "text", description: "URL to which the link leads" },
    children: { control: "text", description: "Link text" },
    disabled: {
      control: { type: "boolean" },
      description: "Locks the link, making it inactive",
    },
  },
};

export default meta;

type Story = StoryObj<LinkProps>;

export const Default: Story = {
  args: {
    children: "Link",
    disabled: false,
  },
};
