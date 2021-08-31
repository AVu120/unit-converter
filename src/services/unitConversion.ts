import {
  TChangeEvent,
  TConversionFunction,
  TMapOfStrings,
  TSetErrors,
  TSetState,
  TUnit,
  TUnits,
  TUnitType,
} from "../types/common";
import data from "./data";

interface IUpdateUnitValuesParams {
  e: TChangeEvent;
  unit: TUnit;
  units: TUnits;
  leftToRightConversion: TConversionFunction;
  rightToLeftConversion: TConversionFunction;
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
    // If user typed into left input.
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
    // If user typed into right input.
    setErrors({
      [units[0]]: "",
      [units[1]]: "Error: only valid numbers allowed.",
    });
    return setState({
      [units[0]]: "",
      [units[1]]: stringValue,
    });
  }
  // Allow user to press delete/backspace button until input field is empty/blank.
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
  // Remove error message when user types valid character (e.g. number or single '.').
  if (!errors.unit)
    setErrors({
      [units[0]]: "",
      [units[1]]: "",
    });

  // When user types into left input, display conversion on right input.
  if (unit === units[0]) {
    return setState({
      [units[0]]: stringValue.includes(".") ? stringValue : numberValue,
      [units[1]]: stringValue === "." ? "" : leftToRightConversion(numberValue),
    });
  }
  // When user types into right input, display conversion on left input.
  setState({
    [units[0]]: stringValue === "." ? "" : rightToLeftConversion(numberValue),
    [units[1]]: stringValue.includes(".") ? stringValue : numberValue,
  });
};

export const getConversionFunctions = (
  unitType: TUnitType,
  unit1: TUnit,
  unit2: TUnit
): [TConversionFunction, TConversionFunction] => {
  let conversionFunctions;
  const unit1Keys = Object.keys(data[unitType].conversionFunctions);
  for (let i = 0; i < unit1Keys.length; i++) {
    let unit1Key = unit1Keys[i];
    let matchingUnit2Keys = Object.keys(
      data[unitType].conversionFunctions[unit1Key]
    );

    for (let j = 0; j < matchingUnit2Keys.length; j++) {
      let matchingUnit2Key = matchingUnit2Keys[j];
      if (unit1 === unit1Key && unit2 === matchingUnit2Key)
        conversionFunctions = data[unitType].conversionFunctions[unit1][unit2];
      else if (unit1 === matchingUnit2Key && unit2 === unit1Key) {
        const result = data[unitType].conversionFunctions[unit2][unit1];
        conversionFunctions = [result[1], result[0]];
      }
    }
  }
  return conversionFunctions;
};

interface IUpdateUnitParams {
  e: any;
  unitType: TUnitType;
  unit: TUnit;
  units: TUnits;
  unitValues: TMapOfStrings;
  setUnitValues: TSetState;
  errors: TMapOfStrings;
  setErrors: TSetErrors;
}

export const updateUnit: any = ({
  e,
  unit,
  units,
  unitType,
  unitValues,
  setUnitValues,
  errors,
  setErrors,
}: IUpdateUnitParams) => {
  let updatedUnitValues;
  let updatedErrors;
  let updatedConversionFunctions;
  const hasSwappedUnits =
    (unit === units[0] && e.target.value === units[1]) ||
    (unit === units[1] && e.target.value === units[0]);
  // When changing unit of 1st input.
  if (unit === units[0]) {
    updatedConversionFunctions = getConversionFunctions(
      unitType,
      e.target.value,
      units[hasSwappedUnits ? 0 : 1]
    );

    if (hasSwappedUnits)
      updatedConversionFunctions = [
        updatedConversionFunctions[1],
        updatedConversionFunctions[0],
      ];

    updatedUnitValues = {
      [e.target.value]: `${Object.values(unitValues)[0]}`,
      [Object.keys(unitValues)[hasSwappedUnits ? 0 : 1]]:
        updatedConversionFunctions[hasSwappedUnits ? 1 : 0](
          Number(Object.values(unitValues)[0])
        ),
    };
    // When changing unit of 2nd input.
  } else {
    updatedConversionFunctions = getConversionFunctions(
      unitType,
      units[hasSwappedUnits ? 1 : 0],
      e.target.value
    );

    updatedUnitValues = {
      [Object.keys(unitValues)[hasSwappedUnits ? 1 : 0]]:
        updatedConversionFunctions[1](Number(Object.values(unitValues)[1])),
      [e.target.value]: `${Object.values(unitValues)[1]}`,
    };
  }

  if (hasSwappedUnits && Object.values(errors).some((error) => error)) {
    updatedErrors = {
      [Object.keys(errors)[0]]: Object.values(errors)[1],
      [Object.keys(errors)[1]]: Object.values(errors)[0],
    };
    setErrors(updatedErrors);
  }
  setUnitValues(updatedUnitValues);
};
