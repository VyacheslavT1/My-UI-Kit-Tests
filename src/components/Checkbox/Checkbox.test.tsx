import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkbox from "./Checkbox";

jest.mock("../../hooks/useLazySVG", () => ({
  useLazySVG: () => () => <svg data-testid="mock-svg-icon" />,
}));

describe("Checkbox Component", () => {
  const labelText = "Text Label";
  const mockOnCheck = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 🔹 Группа тестов рендеринга
  describe("Rendering", () => {
    it("renders with default props", async () => {
      render(<Checkbox onCheck={mockOnCheck} />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
    });

    it("renders with label when provided", async () => {
      render(
        <Checkbox variant="labeled" label={labelText} onCheck={mockOnCheck} />
      );

      expect(screen.getByText(labelText)).toBeInTheDocument();
    });
  });

  // 🔹 Группа тестов взаимодействий
  describe("Interactions", () => {
    it("toggles checked state on click", async () => {
      render(<Checkbox onCheck={mockOnCheck} />);

      const checkbox = screen.getByRole("checkbox");

      await userEvent.click(checkbox);
      expect(checkbox).toBeChecked();

      await userEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it("calls onCheck with correct value", async () => {
      render(<Checkbox onCheck={mockOnCheck} />);

      const checkbox = screen.getByRole("checkbox");

      await userEvent.click(checkbox);
      expect(mockOnCheck).toHaveBeenCalledWith(true);

      await userEvent.click(checkbox);
      expect(mockOnCheck).toHaveBeenCalledWith(false);
    });
  });

  // 🔹 Группа тестов доступности (ARIA)
  describe("Accessibility", () => {
    it("has correct ARIA attributes", async () => {
      render(<Checkbox onCheck={mockOnCheck} />);

      const checkbox = screen.getByRole("checkbox");

      await waitFor(() =>
        expect(checkbox).toHaveAttribute("aria-checked", "false")
      );

      await userEvent.click(checkbox);
      await waitFor(() =>
        expect(checkbox).toHaveAttribute("aria-checked", "true")
      );
    });
  });

  // 🔹 Группа тестов иконок
  describe("Icons", () => {
    it("renders icons if available", async () => {
      render(<Checkbox onCheck={mockOnCheck} />);

      // Ждём загрузки иконок
      await waitFor(() =>
        expect(screen.getByRole("checkbox")).toBeInTheDocument()
      );

      const icons = await screen.findAllByRole("img", { hidden: true });
      expect(icons.length).toBeGreaterThanOrEqual(1);
    });
  });
});
