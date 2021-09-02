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
    const inputElements = screen.getAllByTestId("unit-input");
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

  test("unit inputs convert and matching formula displays correctly", async () => {
    const inputElements = screen.getAllByTestId("unit-input");
    const [inputElement1, inputElement2] = inputElements;

    fireEvent.change(inputElement1, { target: { value: "5" } });
    await waitFor(() => {
      expect(inputElement1).toHaveValue("5");
      expect(inputElement2).toHaveValue("500");
    });

    const unitSelectorElements = screen.getAllByTestId("unit-selector");
    const [unitSelector1, unitSelector2] = unitSelectorElements;

    fireEvent.change(unitSelector2, { target: { value: "mm" } });
    await waitFor(() => {
      expect(inputElement1).toHaveValue("0.5");
      expect(unitSelector1).toHaveDisplayValue(["Meter"]);
      expect(inputElement2).toHaveValue("500");
      expect(unitSelector2).toHaveDisplayValue(["Millimeter"]);
      expect(screen.getByTestId("formula")).toHaveTextContent(
        /Formula multiply the length value by 1000/i
      );
    });

    fireEvent.change(inputElement1, { target: { value: "100" } });
    await waitFor(() => {
      expect(inputElement1).toHaveValue("100");
      expect(inputElement2).toHaveValue("100000");
    });

    fireEvent.change(unitSelector1, { target: { value: "cm" } });
    await waitFor(() => {
      expect(inputElement1).toHaveValue("100");
      expect(unitSelector1).toHaveDisplayValue(["Centimeter"]);
      expect(inputElement2).toHaveValue("1000");
      expect(unitSelector2).toHaveDisplayValue(["Millimeter"]);

      expect(screen.getByTestId("formula")).toHaveTextContent(
        /Formula multiply the length value by 10/i
      );
    });
    fireEvent.change(unitSelector1, { target: { value: "mm" } });
    await waitFor(() => {
      expect(inputElement1).toHaveValue("100");
      expect(unitSelector1).toHaveDisplayValue(["Millimeter"]);
      expect(inputElement2).toHaveValue("10");
      expect(unitSelector2).toHaveDisplayValue(["Centimeter"]);
      expect(screen.getByTestId("formula")).toHaveTextContent(
        /Formula divide the length value by 10/i
      );
    });

    fireEvent.change(unitSelector1, { target: { value: "μm" } });
    await waitFor(() => {
      expect(inputElement1).toHaveValue("100");
      expect(unitSelector1).toHaveDisplayValue(["Micrometer"]);
      expect(inputElement2).toHaveValue("0.01");
      expect(unitSelector2).toHaveDisplayValue(["Centimeter"]);
      expect(screen.getByTestId("formula")).toHaveTextContent(
        /Formula divide the length value by 10000/i
      );
    });

    fireEvent.change(unitSelector2, { target: { value: "m" } });
    await waitFor(() => {
      expect(inputElement1).toHaveValue("10000");
      expect(unitSelector1).toHaveDisplayValue(["Micrometer"]);
      expect(inputElement2).toHaveValue("0.01");
      expect(unitSelector2).toHaveDisplayValue(["Meter"]);
      expect(screen.getByTestId("formula")).toHaveTextContent(
        /Formula divide the length value by 1e\+6/i
      );
    });

    fireEvent.change(unitSelector2, { target: { value: "cm" } });
    await waitFor(() => {
      expect(inputElement1).toHaveValue("100");
      expect(unitSelector1).toHaveDisplayValue(["Micrometer"]);
      expect(inputElement2).toHaveValue("0.01");
      expect(unitSelector2).toHaveDisplayValue(["Centimeter"]);
      expect(screen.getByTestId("formula")).toHaveTextContent(
        /Formula divide the length value by 10000/i
      );
    });

    fireEvent.change(unitSelector2, { target: { value: "mm" } });
    await waitFor(() => {
      expect(inputElement1).toHaveValue("10");
      expect(unitSelector1).toHaveDisplayValue(["Micrometer"]);
      expect(inputElement2).toHaveValue("0.01");
      expect(unitSelector2).toHaveDisplayValue(["Millimeter"]);
      expect(screen.getByTestId("formula")).toHaveTextContent(
        /divide the length value by 1000/i
      );
    });

    fireEvent.change(unitSelector2, { target: { value: "μm" } });
    await waitFor(() => {
      expect(inputElement1).toHaveValue("0.00001");
      expect(unitSelector1).toHaveDisplayValue(["Millimeter"]);
      expect(inputElement2).toHaveValue("0.01");
      expect(unitSelector2).toHaveDisplayValue(["Micrometer"]);
      expect(screen.getByTestId("formula")).toHaveTextContent(
        /multiply the length value by 1000/i
      );
    });

    fireEvent.change(screen.getByTestId("unit-type-selector"), {
      target: { value: "Mass" },
    });
    await waitFor(() => {
      expect(inputElement1).toHaveValue("0");
      expect(unitSelector1).toHaveDisplayValue(["Kilogram"]);
      expect(inputElement2).toHaveValue("0");
      expect(unitSelector2).toHaveDisplayValue(["Gram"]);
      expect(screen.getByTestId("formula")).toHaveTextContent(
        /Formula multiply the mass value by 1000/i
      );
    });
  });
});
