import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

describe("Regression Test Suite", () => {
  type TDomElement = Element | Node | Document | Window;
  let unitTypeSelector: TDomElement,
    inputElement1: TDomElement,
    inputElement2: TDomElement,
    unitSelector1: TDomElement,
    unitSelector2: TDomElement;

  beforeEach(() => {
    render(<App />);
    unitTypeSelector = screen.getByTestId("unit-type-selector");
    inputElement1 = screen.getAllByTestId("unit-input")[0];
    inputElement2 = screen.getAllByTestId("unit-input")[1];
    unitSelector1 = screen.getAllByTestId("unit-selector")[0];
    unitSelector2 = screen.getAllByTestId("unit-selector")[1];
  });

  describe("App renders correctly", () => {
    test("renders title", () => {
      const titleElement = screen.getByText(/unit converter/i);
      expect(titleElement).toBeInTheDocument();
    });
    test("renders unit selectors", () => {
      expect(unitTypeSelector).toHaveDisplayValue("Length");
      expect(unitSelector1).toHaveDisplayValue("Meter");
      expect(unitSelector2).toHaveDisplayValue("Centimeter");
    });

    test("renders text inputs", () => {
      expect(inputElement1).toHaveValue("0");
      expect(inputElement2).toHaveValue("0");
    });

    test("renders formula", () => {
      expect(screen.getByTestId("formula")).toHaveTextContent(
        /Formula multiply the length value by 100/i
      );
    });
  });

  describe("All inputs work", () => {
    test("unit selector works", async () => {
      fireEvent.change(unitSelector1, { target: { value: "mm" } });
      await waitFor(() => {
        expect(unitTypeSelector).toHaveDisplayValue("Length");
        expect(inputElement1).toHaveValue("0");
        expect(unitSelector1).toHaveDisplayValue("Millimeter");
        expect(inputElement2).toHaveValue("0");
        expect(unitSelector2).toHaveDisplayValue("Centimeter");
      });
    });
    test("Unit type selector works", async () => {
      fireEvent.change(unitTypeSelector, { target: { value: "Mass" } });
      await waitFor(() => {
        expect(unitTypeSelector).toHaveDisplayValue("Mass");
        expect(inputElement1).toHaveValue("0");
        expect(unitSelector1).toHaveDisplayValue("Kilogram");
        expect(inputElement2).toHaveValue("0");
        expect(unitSelector2).toHaveDisplayValue("Gram");
      });
    });

    test("units swap correctly", async () => {
      fireEvent.change(unitSelector1, { target: { value: "cm" } });
      await waitFor(() => {
        expect(unitTypeSelector).toHaveDisplayValue("Length");
        expect(inputElement1).toHaveValue("0");
        expect(unitSelector1).toHaveDisplayValue("Centimeter");
        expect(inputElement2).toHaveValue("0");
        expect(unitSelector2).toHaveDisplayValue("Meter");
      });
    });

    test("unit inputs convert and matching formula displays correctly", async () => {
      fireEvent.change(inputElement1, { target: { value: "5" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("5");
        expect(inputElement2).toHaveValue("500");
      });

      fireEvent.change(unitSelector2, { target: { value: "mm" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("0.5");
        expect(unitSelector1).toHaveDisplayValue("Meter");
        expect(inputElement2).toHaveValue("500");
        expect(unitSelector2).toHaveDisplayValue("Millimeter");
        expect(screen.getByTestId("formula")).toHaveTextContent(
          /Formula multiply the length value by 1000/i
        );
      });

      fireEvent.change(inputElement2, { target: { value: "5.5" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("0.0055");
        expect(inputElement2).toHaveValue("5.5");
      });

      fireEvent.change(inputElement1, { target: { value: "100" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("100");
        expect(inputElement2).toHaveValue("100000");
      });

      fireEvent.change(unitSelector1, { target: { value: "cm" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("100");
        expect(unitSelector1).toHaveDisplayValue("Centimeter");
        expect(inputElement2).toHaveValue("1000");
        expect(unitSelector2).toHaveDisplayValue("Millimeter");

        expect(screen.getByTestId("formula")).toHaveTextContent(
          /Formula multiply the length value by 10/i
        );
      });

      fireEvent.change(inputElement2, { target: { value: "6.789" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("0.6789");
        expect(inputElement2).toHaveValue("6.789");
      });

      fireEvent.change(inputElement1, { target: { value: "100" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("100");
        expect(inputElement2).toHaveValue("1000");
      });

      fireEvent.change(unitSelector1, { target: { value: "mm" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("100");
        expect(unitSelector1).toHaveDisplayValue("Millimeter");
        expect(inputElement2).toHaveValue("10");
        expect(unitSelector2).toHaveDisplayValue("Centimeter");
        expect(screen.getByTestId("formula")).toHaveTextContent(
          /Formula divide the length value by 10/i
        );
      });

      fireEvent.change(inputElement2, { target: { value: "30.02" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("300.2");
        expect(inputElement2).toHaveValue("30.02");
      });

      fireEvent.change(inputElement1, { target: { value: "100" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("100");
        expect(inputElement2).toHaveValue("10");
      });

      fireEvent.change(unitSelector1, { target: { value: "μm" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("100");
        expect(unitSelector1).toHaveDisplayValue("Micrometer");
        expect(inputElement2).toHaveValue("0.01");
        expect(unitSelector2).toHaveDisplayValue("Centimeter");
        expect(screen.getByTestId("formula")).toHaveTextContent(
          /Formula divide the length value by 10000/i
        );
      });

      fireEvent.change(inputElement2, { target: { value: "0.02" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("200");
        expect(inputElement2).toHaveValue("0.02");
      });

      fireEvent.change(inputElement1, { target: { value: "100" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("100");
        expect(inputElement2).toHaveValue("0.01");
      });

      fireEvent.change(unitSelector2, { target: { value: "m" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("10000");
        expect(unitSelector1).toHaveDisplayValue("Micrometer");
        expect(inputElement2).toHaveValue("0.01");
        expect(unitSelector2).toHaveDisplayValue("Meter");
        expect(screen.getByTestId("formula")).toHaveTextContent(
          /Formula divide the length value by 1e\+6/i
        );
      });

      fireEvent.change(inputElement2, { target: { value: "0.00342" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("3420");
        expect(inputElement2).toHaveValue("0.00342");
      });

      fireEvent.change(inputElement1, { target: { value: "10000" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("10000");
        expect(inputElement2).toHaveValue("0.01");
      });

      fireEvent.change(unitSelector2, { target: { value: "cm" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("100");
        expect(unitSelector1).toHaveDisplayValue("Micrometer");
        expect(inputElement2).toHaveValue("0.01");
        expect(unitSelector2).toHaveDisplayValue("Centimeter");
        expect(screen.getByTestId("formula")).toHaveTextContent(
          /Formula divide the length value by 10000/i
        );
      });

      fireEvent.change(inputElement2, { target: { value: "0.9" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("9000");
        expect(inputElement2).toHaveValue("0.9");
      });

      fireEvent.change(inputElement1, { target: { value: "100" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("100");
        expect(inputElement2).toHaveValue("0.01");
      });

      fireEvent.change(unitSelector2, { target: { value: "mm" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("10");
        expect(unitSelector1).toHaveDisplayValue("Micrometer");
        expect(inputElement2).toHaveValue("0.01");
        expect(unitSelector2).toHaveDisplayValue("Millimeter");
        expect(screen.getByTestId("formula")).toHaveTextContent(
          /divide the length value by 1000/i
        );
      });

      fireEvent.change(inputElement2, { target: { value: "3.243" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("3243");
        expect(inputElement2).toHaveValue("3.243");
      });

      fireEvent.change(inputElement1, { target: { value: "10" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("10");
        expect(inputElement2).toHaveValue("0.01");
      });

      fireEvent.change(unitSelector2, { target: { value: "μm" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("0.00001");
        expect(unitSelector1).toHaveDisplayValue("Millimeter");
        expect(inputElement2).toHaveValue("0.01");
        expect(unitSelector2).toHaveDisplayValue("Micrometer");
        expect(screen.getByTestId("formula")).toHaveTextContent(
          /multiply the length value by 1000/i
        );
      });

      fireEvent.change(inputElement1, { target: { value: "4.35" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("4.35");
        expect(inputElement2).toHaveValue("4350");
      });

      fireEvent.change(unitTypeSelector, {
        target: { value: "Mass" },
      });
      await waitFor(() => {
        expect(unitTypeSelector).toHaveDisplayValue("Mass");
        expect(inputElement1).toHaveValue("0");
        expect(unitSelector1).toHaveDisplayValue("Kilogram");
        expect(inputElement2).toHaveValue("0");
        expect(unitSelector2).toHaveDisplayValue("Gram");
        expect(screen.getByTestId("formula")).toHaveTextContent(
          /Formula multiply the mass value by 1000/i
        );
      });

      fireEvent.change(inputElement1, { target: { value: "1" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("1");
        expect(inputElement2).toHaveValue("1000");
      });

      fireEvent.change(inputElement2, { target: { value: "523" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("0.523");
        expect(inputElement2).toHaveValue("523");
      });

      fireEvent.change(unitSelector2, { target: { value: "kg" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("523000");
        expect(unitSelector1).toHaveDisplayValue("Gram");
        expect(inputElement2).toHaveValue("523");
        expect(unitSelector2).toHaveDisplayValue("Kilogram");
        expect(screen.getByTestId("formula")).toHaveTextContent(
          /Formula divide the mass value by 1000/i
        );
      });

      fireEvent.change(inputElement2, { target: { value: "44" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("44000");
        expect(inputElement2).toHaveValue("44");
      });

      fireEvent.change(inputElement1, { target: { value: "3.098" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("3.098");
        expect(inputElement2).toHaveValue("0.003098");
      });
    });
  });

  describe("Error handling works correctly", () => {
    const errorRegex = /Error: only valid numbers allowed./i;
    test("only show error message when user types anything but valid number", async () => {
      fireEvent.change(inputElement1, { target: { value: "a" } });
      await screen.findByText(errorRegex);

      fireEvent.change(inputElement1, { target: { value: "" } });
      await waitFor(() => {
        expect(screen.queryByText(errorRegex)).not.toBeInTheDocument();
      });

      fireEvent.change(inputElement2, { target: { value: "-" } });
      await screen.findByText(errorRegex);

      fireEvent.change(inputElement2, { target: { value: "2" } });
      await waitFor(() => {
        expect(screen.queryByText(errorRegex)).not.toBeInTheDocument();
      });
    });

    test("remove error message and reset values to 0 when user changes unit", async () => {
      fireEvent.change(inputElement1, { target: { value: "%" } });
      await screen.findByText(errorRegex);

      fireEvent.change(unitSelector1, { target: { value: "mm" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("0");
        expect(unitSelector1).toHaveDisplayValue("Millimeter");
        expect(inputElement2).toHaveValue("0");
        expect(unitSelector2).toHaveDisplayValue("Centimeter");
        expect(screen.queryByText(errorRegex)).not.toBeInTheDocument();
      });

      fireEvent.change(inputElement2, { target: { value: "*" } });
      await screen.findByText(errorRegex);

      fireEvent.change(unitSelector2, { target: { value: "mm" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("0");
        expect(unitSelector1).toHaveDisplayValue("Centimeter");
        expect(inputElement2).toHaveValue("0");
        expect(unitSelector2).toHaveDisplayValue("Millimeter");
        expect(screen.queryByText(errorRegex)).not.toBeInTheDocument();
      });

      fireEvent.change(inputElement1, { target: { value: "^" } });
      await screen.findByText(errorRegex);

      fireEvent.change(unitTypeSelector, { target: { value: "Mass" } });
      await waitFor(() => {
        expect(inputElement1).toHaveValue("0");
        expect(inputElement2).toHaveValue("0");
        expect(screen.queryByText(errorRegex)).not.toBeInTheDocument();
      });
    });
  });
});
