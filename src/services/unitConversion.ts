import { ChangeEvent } from "react";
import { ILength, IMass, ITime } from "../types/units";

/**
 * @description Changes the values displayed on the Meter and Centimeter inputs.
 * @param e Input element's onChange event.
 * @param unit Unit of input being typed into.
 * @param setLength SetState function that changes the length state.
 */
export const changeLength = (
  e: ChangeEvent<HTMLInputElement>,
  unit: "m" | "cm",
  setLength: ({ meters, centimeters }: ILength) => void
): void => {
  const stringValue = e.target.value;
  const numberValue = Number(stringValue);
  // if a number or "".
  if (!isNaN(numberValue)) {
    if (stringValue === "") return setLength({ meters: "", centimeters: "" });
    if (unit === "m")
      return setLength({
        meters: stringValue.includes(".") ? stringValue : numberValue,
        centimeters: numberValue * 100,
      });
    setLength({
      meters: numberValue / 100,
      centimeters: stringValue.includes(".") ? stringValue : numberValue,
    });
  }
};

/**
 * @description Changes the values displayed on the Kilogram and Gram inputs.
 * @param e Input element's onChange event.
 * @param unit Unit of input being typed into.
 * @param setMass SetState function that changes the mass state.
 */
export const changeMass = (
  e: ChangeEvent<HTMLInputElement>,
  unit: "kg" | "g",
  setMass: ({ kilograms, grams }: IMass) => void
): void => {
  const stringValue = e.target.value;
  const numberValue = Number(stringValue);
  // if a number or "".
  if (!isNaN(numberValue)) {
    if (stringValue === "") return setMass({ kilograms: "", grams: "" });
    if (unit === "kg")
      return setMass({
        kilograms: stringValue.includes(".") ? stringValue : numberValue,
        grams: numberValue * 1000,
      });
    setMass({
      kilograms: numberValue / 1000,
      grams: stringValue.includes(".") ? stringValue : numberValue,
    });
  }
};

/**
 * @description Changes the values displayed on the Minute and Second inputs.
 * @param e Input element's onChange event.
 * @param unit Unit of input being typed into.
 * @param setMass SetState function that changes the time state.
 */
export const changeTime = (
  e: ChangeEvent<HTMLInputElement>,
  unit: "min" | "s",
  setTime: ({ minutes, seconds }: ITime) => void
): void => {
  const stringValue = e.target.value;
  const numberValue = Number(stringValue);
  // if a number or "".
  if (!isNaN(numberValue)) {
    if (stringValue === "") return setTime({ minutes: "", seconds: "" });
    if (unit === "min")
      return setTime({
        minutes: stringValue.includes(".") ? stringValue : numberValue,
        seconds: numberValue * 60,
      });
    setTime({
      minutes: numberValue / 60,
      seconds: stringValue.includes(".") ? stringValue : numberValue,
    });
  }
};
