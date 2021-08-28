import { Dispatch, SetStateAction } from "react";
import { ChangeEvent } from "react";
// import { ILength, IMass, ITime } from "../types/units";
import { IMap } from "../types/common";

interface IUpdateUnitValuesParams {
  e: ChangeEvent<HTMLInputElement>;
  unit: string;
  units: [string, string];
  leftToRightConversion: (param: number) => number;
  rightToLeftConversion: (param: number) => number;
  setState: Dispatch<SetStateAction<IMap<string | number>>>;
  setErrors: Dispatch<SetStateAction<IMap<string>>>;
  errors: IMap<string>;
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
        [units[0]]: "Error, only valid numbers allowed",
        [units[1]]: "",
      });
      return setState({
        [units[0]]: stringValue,
        [units[1]]: "",
      });
    }
    setErrors({
      [units[0]]: "",
      [units[1]]: "Error, only valid numbers allowed",
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
// /**
//  * @description Changes the values displayed on the Meter and Centimeter inputs.
//  * @param e Input element's onChange event.
//  * @param unit Unit of input being typed into.
//  * @param setLength SetState function that changes the length state.
//  */
// export const changeLength = (
//   e: ChangeEvent<HTMLInputElement>,
//   unit: "m" | "cm",
//   setLength: ({ meters, centimeters }: ILength) => void
// ): void => {
//   const stringValue = e.target.value;
//   const numberValue = Number(stringValue);
//   // If user types in a non-number and non-dot.
//   if (
//     stringValue
//       .split("")
//       .some(
//         (char) =>
//           (char !== "." && isNaN(Number(char))) ||
//           stringValue.replace(".", "").includes(".") ||
//           stringValue.replace(".", "") === ""
//       )
//   ) {
//     if (unit === "m")
//       return setLength({
//         meters: stringValue,
//         centimeters: "",
//         error: { m: "Only numbers are accepted.", cm: "" },
//       });
//     return setLength({
//       meters: "",
//       centimeters: stringValue,
//       error: { m: "", cm: "Only numbers are accepted." },
//     });
//   }
//   if (stringValue === "")
//     return setLength({ meters: "", centimeters: "", error: { m: "", cm: "" } });
//   if (unit === "m")
//     return setLength({
//       meters: stringValue.includes(".") ? stringValue : numberValue,
//       centimeters: numberValue * 100,
//       error: { m: "", cm: "" },
//     });
//   setLength({
//     meters: numberValue / 100,
//     centimeters: stringValue.includes(".") ? stringValue : numberValue,
//     error: { m: "", cm: "" },
//   });
// };

// /**
//  * @description Changes the values displayed on the Kilogram and Gram inputs.
//  * @param e Input element's onChange event.
//  * @param unit Unit of input being typed into.
//  * @param setMass SetState function that changes the mass state.
//  */
// export const changeMass = (
//   e: ChangeEvent<HTMLInputElement>,
//   unit: "kg" | "g",
//   setMass: ({ kilograms, grams }: IMass) => void
// ): void => {
//   const stringValue = e.target.value;
//   const numberValue = Number(stringValue);
//   // if a number or "".
//   if (!isNaN(numberValue)) {
//     if (stringValue === "")
//       return setMass({ kilograms: "", grams: "", error: "" });
//     if (unit === "kg")
//       return setMass({
//         kilograms: stringValue.includes(".") ? stringValue : numberValue,
//         grams: numberValue * 1000,
//       });
//     setMass({
//       kilograms: numberValue / 1000,
//       grams: stringValue.includes(".") ? stringValue : numberValue,
//     });
//   }
// };

// /**
//  * @description Changes the values displayed on the Minute and Second inputs.
//  * @param e Input element's onChange event.
//  * @param unit Unit of input being typed into.
//  * @param setMass SetState function that changes the time state.
//  */
// export const changeTime = (
//   e: ChangeEvent<HTMLInputElement>,
//   unit: "min" | "s",
//   setTime: ({ minutes, seconds }: ITime) => void
// ): void => {
//   const stringValue = e.target.value;
//   const numberValue = Number(stringValue);
//   // if a number or "".
//   if (!isNaN(numberValue)) {
//     if (stringValue === "")
//       return setTime({ minutes: "", seconds: "", error: "" });
//     if (unit === "min")
//       return setTime({
//         minutes: stringValue.includes(".") ? stringValue : numberValue,
//         seconds: numberValue * 60,
//       });
//     setTime({
//       minutes: numberValue / 60,
//       seconds: stringValue.includes(".") ? stringValue : numberValue,
//     });
//   }
// };
