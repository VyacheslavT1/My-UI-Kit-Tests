import type { Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../src/providers/ThemeContext";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
  },
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Select light or dark theme",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: ["light", "dark"],
        showName: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => {
      return (
        <ThemeProvider theme={context.globals.theme}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
