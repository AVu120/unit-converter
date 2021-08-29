import { Dispatch, SetStateAction, ChangeEvent } from "react";

export interface IMap<T> {
  [key: string]: T;
}

export type TMapOfStrings = IMap<string>;
export type TMapOfStringOrNumbers = IMap<string | number>;

export type TSetState = Dispatch<SetStateAction<IMap<string | number>>>;
export type TSetErrors = Dispatch<SetStateAction<IMap<string>>>;

export type TChangeEvent = ChangeEvent<HTMLInputElement>;
