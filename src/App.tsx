import { ChangeEvent, useState } from "react";
import {
  default as Unit1Input,
  default as Unit2Input,
} from "../src/components/input/Input";
import styles from "./App.module.scss";
import { updateUnitValues } from "./services/unitConversion";
import { IMap } from "./types/common";

function App() {
  const [measurement, setMeasurement] = useState("Length");
  const [unitValues, setUnitValues] = useState<IMap<string | number>>({
    unit1: 0,
    unit2: 0,
  });

  const [errors, setErrors] = useState<IMap<string>>({
    unit1: "",
    unit2: "",
  });

  return (
    <div className={styles.App}>
      <h1>Unit Converter</h1>
      <div className={styles.inputs_container}>
        <select className={styles.measurement_selector_input}>
          <option>Length</option>
        </select>
        <div className={styles.inputs_grid}>
          <Unit1Input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateUnitValues({
                e,
                unit: "m",
                units: ["m", "cm"],
                leftToRightConversion: (num) => num * 100,
                rightToLeftConversion: (num) => num / 100,
                setState: setUnitValues,
                setErrors,
                errors,
              })
            }
            value={unitValues.m}
            unit="m"
            label="Meter"
            errors={errors}
          />
          <span className={styles.equalSign}>=</span>
          <Unit2Input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              updateUnitValues({
                e,
                unit: "cm",
                units: ["m", "cm"],
                leftToRightConversion: (num) => num * 100,
                rightToLeftConversion: (num) => num / 100,
                setState: setUnitValues,
                setErrors,
                errors,
              });
            }}
            value={unitValues.cm}
            unit="cm"
            label="Centimeter"
            errors={errors}
          />
        </div>
        <div className={styles.formula}>
          <span className={styles.formula_logo}>Formula</span> multiply the
          length value by 100
        </div>
      </div>
    </div>
  );
}

export default App;
