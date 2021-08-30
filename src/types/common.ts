import { Dispatch, SetStateAction, ChangeEvent } from "react";

// Maps
export interface IMap<T> {
  [key: string]: T;
}
export type TMapOfStrings = IMap<string>;
export type TMapOfStringOrNumbers = IMap<string | number>;

// SetState functions
export type TSetState = Dispatch<SetStateAction<IMap<string | number>>>;
export type TSetErrors = Dispatch<SetStateAction<IMap<string>>>;

// HTML input events
export type TChangeEvent = ChangeEvent<HTMLInputElement>;

// Conversion functions
export type TConversionFunction = (param: number) => number;
