import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";
import styles from "./Button.module.css";

describe("Button Component", () => {
  const buttonText = "Test Button";
  const iconTestId = "test-icon";
  const mockIcon = <svg data-testid={iconTestId} />;

  it("renders with required props", () => {
    render(<Button variant="primary">{buttonText}</Button>);
    const button = screen.getByRole("button", { name: buttonText });

    expect(button).toBeInTheDocument();
  });

  describe("styling", () => {
    it("applies correct classes for primary variant", () => {
      render(<Button variant="primary">{buttonText}</Button>);
      expect(screen.getByRole("button")).toHaveClass(styles.primary);
    });

    it("applies correct classes for secondary variant", () => {
      render(<Button variant="secondary">{buttonText}</Button>);
      expect(screen.getByRole("button")).toHaveClass(styles.secondary);
    });
  });

  describe("icon", () => {
    it("displays an icon when the icon prop is provided", () => {
      render(
        <Button variant="primary" icon={mockIcon}>
          {buttonText}
        </Button>
      );
      expect(screen.getByTestId(iconTestId)).toBeInTheDocument();
    });

    it("does not display an icon if the icon prop is missing", () => {
      render(<Button variant="primary">{buttonText}</Button>);
      expect(screen.queryByTestId(iconTestId)).not.toBeInTheDocument();
    });

    it("positions the icon correctly", () => {
      render(
        <Button variant="primary" icon={mockIcon}>
          {buttonText}
        </Button>
      );
      expect(screen.getByRole("button").firstChild).toHaveClass(styles.icon);
      expect(screen.getByRole("button").lastChild).toHaveTextContent(
        buttonText
      );
    });
  });

  describe("disabled state", () => {
    it("renders as disabled when the disabled prop is provided", () => {
      render(
        <Button variant="primary" disabled>
          {buttonText}
        </Button>
      );
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("does not trigger onClick when disabled", async () => {
      const handleClick = jest.fn();
      render(
        <Button variant="primary" disabled onClick={handleClick}>
          {buttonText}
        </Button>
      );
      await userEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("event handling", () => {
    it("calls onClick when clicked", async () => {
      const handleClick = jest.fn();
      render(
        <Button variant="primary" onClick={handleClick}>
          {buttonText}
        </Button>
      );
      await userEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  it("accepts and applies standard HTML attributes", () => {
    render(
      <Button variant="primary" type="submit" aria-label="Custom label">
        {buttonText}
      </Button>
    );
    const button = screen.getByRole("button", { name: "Custom label" });
    expect(button).toHaveAttribute("type", "submit");
  });

  it("correctly renders provided children", () => {
    render(
      <Button variant="primary">
        <span data-testid="custom-child">Custom Content</span>
      </Button>
    );
    expect(screen.getByTestId("custom-child")).toBeInTheDocument();
  });

  it("adds custom classes from the className prop", () => {
    const customClass = "custom-class";
    render(
      <Button variant="primary" className={customClass}>
        {buttonText}
      </Button>
    );
    expect(screen.getByRole("button")).toHaveClass(customClass);
  });
});
