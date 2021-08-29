import {
  TSetState,
  TSetErrors,
  TMapOfStrings,
  TChangeEvent,
} from "../types/common";

interface IUpdateUnitValuesParams {
  e: TChangeEvent;
  unit: string;
  units: [string, string];
  leftToRightConversion: (param: number) => number;
  rightToLeftConversion: (param: number) => number;
  setState: TSetState;
  setErrors: TSetErrors;
  errors: TMapOfStrings;
}

export const updateUnitValues = ({
  e,
  unit,
  units,
  leftToRightConversion,
  rightToLeftConversion,
  setState,
  setErrors,
  errors,
}: IUpdateUnitValuesParams): void => {
  const stringValue = e.target.value.trim();
  const numberValue = Number(stringValue);
  // Display error message if user types in a non-number, multiple dots or a space character.
  if (
    stringValue
      .split("")
      .some(
        (char) =>
          (char !== "." && isNaN(Number(char))) ||
          stringValue.replace(".", "").includes(".")
      )
  ) {
    if (unit === units[0]) {
      setErrors({
        [units[0]]: "Error: only valid numbers allowed.",
        [units[1]]: "",
      });
      return setState({
        [units[0]]: stringValue,
        [units[1]]: "",
      });
    }
    setErrors({
      [units[0]]: "",
      [units[1]]: "Error: only valid numbers allowed.",
    });
    return setState({
      [units[0]]: "",
      [units[1]]: stringValue,
    });
  }
  if (stringValue === "") {
    if (!errors.unit)
      setErrors({
        [units[0]]: "",
        [units[1]]: "",
      });
    return setState({
      [units[0]]: "",
      [units[1]]: "",
    });
  }
  if (!errors.unit)
    setErrors({
      [units[0]]: "",
      [units[1]]: "",
    });
  if (unit === units[0]) {
    return setState({
      [units[0]]: stringValue.includes(".") ? stringValue : numberValue,
      [units[1]]: stringValue === "." ? "" : leftToRightConversion(numberValue),
    });
  }
  setState({
    [units[0]]: stringValue === "." ? "" : rightToLeftConversion(numberValue),
    [units[1]]: stringValue.includes(".") ? stringValue : numberValue,
  });
};
