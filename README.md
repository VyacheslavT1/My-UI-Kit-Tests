# UI Kit for Storybook

This project is a UI kit for building reusable components with Storybook, leveraging TypeScript and supporting both dark and light themes. It includes a collection of common UI elements that can be used across various applications, allowing for consistent design and easy theming.

## Features

- Theming Support: Built-in support for light and dark themes to ensure a consistent experience across different environments.
- Reusable Components: A collection of basic components like buttons, inputs, and cards, designed to be reusable across various projects.
- Storybook Integration: Fully integrated with Storybook for easy development, testing, and documentation of UI components.
- TypeScript Support: The entire project is written in TypeScript for better type safety and developer experience.
- Customizable Styles: Use SCSS modules to easily customize styles for each component.
- Component Variations: Easily switch between light and dark theme versions of components to visualize different states.

# Requirements

- Node.js >= 18.0.0
- NPM >= 9.0.0 or Yarn (optional)
- Storybook (for running and testing the components in isolation)
- TypeScript

# Installation and Running the Project

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies: npm install
4. Start the development server: npm run storybook
5. Open the app in your browser: http://localhost:6006

# Project Structure

The project is organized into the following directories:

- src/components: Contains reusable React components.

  - Button: A button component with support for light and dark themes.
  - InputField: Input fields with customizable label and placeholder text.
  - SelectMenu: A dropdown component for selecting options.
  - Checkbox: A checkbox component that allows users to select one or more options.
  - ColorPicker: A color picker component that allows users to choose colors through a visual palette.
  - DatePicker: A date picker component that allows users to select a date from a calendar.
  - Dropdown: A simple dropdown component for displaying a list of options, with support for handling selections.
  - Link: A link component that allows users to navigate between pages or external URLs.
  - TextArea: A text area component for multiline text input, with support for resizing and placeholder text.
  - Toast: A toast notification component that displays brief, non-intrusive messages.
  - Modal: A modal dialog component with theme variations, used for displaying content.

- src/styles: Contains global SCSS files for styling the components.

  - variables.scss: Defines variables for light and dark themes, including color schemes.
  - global.scss: Contains general styles and global settings for the project.

- src/providers: Contains context providers that manage and provide global application state.

  - ThemeContext.tsx: A context provider component that manages the global theme (light/dark) across the application

# How It Works

Theme Switching: The project supports dynamic switching between light and dark themes using a custom hook useTheme. The theme can be toggled at runtime, and the UI will adapt accordingly.

Reusable Components: Each component (e.g., Button, InputField, SelectField) is built to be reusable and can adapt its styles based on the current theme. These components are styled using SCSS modules, ensuring modular and maintainable styles.

Storybook: The project is fully integrated with Storybook. Each component has its own Storybook story, where you can view the component's variations in light and dark themes.

# Technologies Used

- React: For building the user interface and components.
- TypeScript: For type safety and a better development experience.
- Storybook: For developing and showcasing UI components in isolation.
- SCSS Modules: For modular and maintainable styling.
- Vite: For fast development and optimized builds.
- CSS Variables: For managing theme variables like colors and font sizes.
- React Context and Hooks: For managing theme state globally across the application.

# Example Usage

- Button Component (Storybook Example)

```tsx
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

export const PrimaryWithIcon: Story = {
  args: {
    children: "Button",
    variant: "primary",
    icon: <PlayIcon />,
  },
};
```

# Contributing

- Fork the repository and clone it to your local machine.
- Create a new branch for your changes:
  git checkout -b feature/new-component

- Make your changes to the components, styles, or stories.
- Commit your changes and push them to your fork:
  git commit -m "Add new button component"
  git push origin feature/new-component

- Create a pull request to the main repository.

<code>- Create a pull request to the main repository.</code>

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
