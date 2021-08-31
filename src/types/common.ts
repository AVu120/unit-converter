import {
  Dispatch,
  SetStateAction,
  ChangeEvent,
  ChangeEventHandler,
} from "react";

// Maps
export interface IMap<T> {
  [key: string]: T;
}
export type TMapOfStrings = IMap<string>;
export type TMapOfStringOrNumbers = IMap<string | number>;

// State
export type TUnit = string;
export type TUnitType = string;
export type TUnits = [string, string];

// SetState functions
export type TSetState = Dispatch<SetStateAction<IMap<string | number>>>;
export type TSetErrors = Dispatch<SetStateAction<IMap<string>>>;

// HTML input events
export type TChangeEvent = ChangeEvent<HTMLInputElement>;

// HTML input event handlers:
export type TSelectEventHandler =
  | ChangeEventHandler<HTMLSelectElement>
  | undefined;
// Conversion functions
export type TConversionFunction = (param: number) => number;
