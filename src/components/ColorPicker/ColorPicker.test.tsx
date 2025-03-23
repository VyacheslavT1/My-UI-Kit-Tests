import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ColorPicker from "./ColorPicker";

jest.mock("../../hooks/useLazySVG", () => ({
  useLazySVG: () => () => <svg data-testid="mock-svg-icon" />,
}));

describe("ColorPicker Component", () => {
  const mockOnSelect = jest.fn();
  const iconColor = ["#ff0000", "#00ff00"];
  const paletteLabel = "test label";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 🔹 Группа тестов рендеринга
  describe("Rendering", () => {
    it("renders with default props", async () => {
      render(
        <ColorPicker
          colors={iconColor}
          label={paletteLabel}
          onSelect={mockOnSelect}
        />
      );

      await waitFor(() => {
        expect(screen.getAllByRole("img").length).toBeGreaterThan(0);
      });
    });
  });

  // 🔹 Группа тестов взаимодействий
  describe("Interactions", () => {
    it("applies selected class on click", async () => {
      render(
        <ColorPicker
          colors={iconColor}
          label={paletteLabel}
          onSelect={mockOnSelect}
        />
      );

      await waitFor(() => {
        expect(screen.getAllByRole("img").length).toBeGreaterThan(0);
      });

      const colorPicker = screen.getAllByRole("img")[0];

      await userEvent.click(colorPicker);
      expect(colorPicker).toHaveClass("selected");
    });

    it("removes class 'selected' from previously clicked icon", async () => {
      render(
        <ColorPicker
          colors={iconColor}
          label={paletteLabel}
          onSelect={mockOnSelect}
        />
      );

      await waitFor(() => {
        expect(screen.getAllByRole("img").length).toBeGreaterThan(1);
      });

      const icons = screen.getAllByRole("img");
      const firstIcon = icons[0];
      const secondIcon = icons[1];

      await userEvent.click(firstIcon);
      expect(firstIcon).toHaveClass("selected");
      expect(secondIcon).not.toHaveClass("selected");

      await userEvent.click(secondIcon);
      expect(firstIcon).not.toHaveClass("selected");
      expect(secondIcon).toHaveClass("selected");
    });
  });

  // 🔹 Группа тестов доступности (ARIA)
  describe("Accessibility", () => {
    it("has correct ARIA attributes", async () => {
      render(
        <ColorPicker
          colors={iconColor}
          label={paletteLabel}
          onSelect={mockOnSelect}
        />
      );

      const icons = await screen.findAllByRole("img");

      icons.forEach((icon, index) => {
        expect(icon).toHaveAttribute("aria-label", `Color ${iconColor[index]}`);
      });
    });

    it("calls onSelect with correct color", async () => {
      render(
        <ColorPicker
          colors={iconColor}
          label={paletteLabel}
          onSelect={mockOnSelect}
        />
      );

      const icons = await screen.findAllByRole("img");

      await userEvent.click(icons[0]);
      expect(mockOnSelect).toHaveBeenCalledWith(iconColor[0]);
    });

    it("renders without errors when colors array is empty", async () => {
      render(
        <ColorPicker colors={[]} label={paletteLabel} onSelect={mockOnSelect} />
      );

      expect(screen.queryByRole("img")).toBeNull();
    });

    it("renders label correctly", async () => {
      render(
        <ColorPicker
          colors={iconColor}
          label={paletteLabel}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.getByText(paletteLabel)).toBeInTheDocument();
    });

    it("handles multiple clicks on the same icon gracefully", async () => {
      render(
        <ColorPicker
          colors={iconColor}
          label={paletteLabel}
          onSelect={mockOnSelect}
        />
      );

      const [firstIcon] = await screen.findAllByRole("img");

      await userEvent.click(firstIcon);
      expect(firstIcon).toHaveClass("selected");

      await userEvent.click(firstIcon);
      expect(firstIcon).toHaveClass("selected");
      expect(mockOnSelect).toHaveBeenCalledTimes(2);
    });
  });
});
