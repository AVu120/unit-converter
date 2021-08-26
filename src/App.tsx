import { ChangeEvent, useState } from "react";
import {
  default as MetersInput,
  default as CentimetersInput,
  default as KilogramsInput,
  default as GramsInput,
} from "../src/components/input/Input";
import styles from "./App.module.scss";

interface ILength {
  meters: number | string;
  centimeters: number | string;
}

interface IMass {
  kilograms: number | string;
  grams: number | string;
}

function App() {
  const [length, setLength] = useState<ILength>({ meters: 0, centimeters: 0 });
  const [mass, setMass] = useState<IMass>({ kilograms: 0, grams: 0 });

  const changeLength = (
    e: ChangeEvent<HTMLInputElement>,
    unit: "m" | "cm"
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

  const changeMass = (
    e: ChangeEvent<HTMLInputElement>,
    unit: "kg" | "g"
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
  return (
    <div className={styles.App}>
      <h1>Unit Converter</h1>
      <div className={styles.grid}>
        <MetersInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => changeLength(e, "m")}
          value={length.meters}
          label="Meter"
        />
        <CentimetersInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => changeLength(e, "cm")}
          value={length.centimeters}
          label="Centimeter"
        />
        <KilogramsInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => changeMass(e, "kg")}
          value={mass.kilograms}
          label="Kilogram"
        />
        <GramsInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => changeMass(e, "g")}
          value={mass.grams}
          label="Gram"
        />
      </div>
    </div>
  );
}

export default App;
