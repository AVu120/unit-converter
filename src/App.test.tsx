import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

describe("App renders correctly", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("renders title", () => {
    const titleElement = screen.getByText(/unit converter/i);
    expect(titleElement).toBeInTheDocument();
  });
  test("renders select inputs", () => {
    const selectElements = screen.getAllByRole("combobox");
    expect(selectElements.length).toBe(3);
    expect(selectElements[0]).toHaveDisplayValue("Length");
    expect(selectElements[1]).toHaveDisplayValue("Meter");
    expect(selectElements[2]).toHaveDisplayValue("Centimeter");
  });

  test("renders text inputs", () => {
    const inputElements = screen.getAllByRole("spinbutton");
    expect(inputElements.length).toBe(2);
    expect(inputElements[0]).toHaveDisplayValue("0");
    expect(inputElements[1]).toHaveDisplayValue("0");
  });

  test("renders formula", () => {
    expect(screen.getByTestId("formula")).toHaveTextContent(
      /Formula multiply the length value by 100/i
    );
  });
});

describe("All inputs work", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("Unit type select input works", async () => {
    const unitTypeSelector = screen.getByTestId("unit-type-selector");
    fireEvent.change(unitTypeSelector, { target: { value: "Mass" } });
    await waitFor(() => {
      expect(unitTypeSelector).toHaveDisplayValue("Mass");
    });
  });

  test("unit select input works", async () => {
    const unitSelectorElements = screen.getAllByTestId("unit-selector");
    const unitSelector1 = unitSelectorElements[0];
    fireEvent.change(unitSelector1, { target: { value: "mm" } });
    await waitFor(() => {
      expect(unitSelector1).toHaveDisplayValue(["Millimeter"]);
    });
  });

  test("units swap correctly", async () => {
    const unitSelectorElements = screen.getAllByTestId("unit-selector");
    const [unitSelector1, unitSelector2] = unitSelectorElements;
    fireEvent.change(unitSelector1, { target: { value: "cm" } });
    await waitFor(() => {
      expect(unitSelector1).toHaveDisplayValue(["Centimeter"]);
      expect(unitSelector2).toHaveDisplayValue(["Meter"]);
    });
  });

  test("unit inputs convert correctly", async () => {
    const inputElements = screen.getAllByRole("spinbutton");
    const [inputElement1, inputElement2] = inputElements;
    fireEvent.change(inputElement1, { target: { value: "5" } });
    await waitFor(() => {
      expect(inputElement1).toHaveDisplayValue("5");
      expect(inputElement2).toHaveDisplayValue("500");
    });
  });
});
