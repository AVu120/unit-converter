import { ChangeEvent, useState } from "react";
import {
  default as CentimetersInput,
  // default as GramsInput,
  // default as KilogramsInput,
  default as MetersInput,
  // default as MinutesInput,
  // default as SecondsInput,
} from "../src/components/input/Input";
import styles from "./App.module.scss";
import {
  // changeLength,
  // changeMass,
  // changeTime,
  updateUnitValues,
} from "./services/unitConversion";
// import { ILength, IMass, ITime } from "./types/units";
import { IMap } from "./types/common";

function App() {
  const [length, setLength] = useState<IMap<string | number>>({
    unit1: 0,
    unit2: 0,
  });
  // const [mass, setMass] = useState<IMass>({
  //   kilograms: 0,
  //   grams: 0,
  // });
  // const [time, setTime] = useState<ITime>({
  //   minutes: 0,
  //   seconds: 0,
  // });

  const [errors, setErrors] = useState<IMap<string>>({
    Meters: "",
    Centimeters: "",
  });

  return (
    <div className={styles.App}>
      <h1>Unit Converter</h1>
      <div className={styles.grid}>
        {/* <MetersInput
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            // changeLength(e, "m", setLength)
            updateUnitValues({
              e,
              unit: "m",
              units: ["m", "cm"],
              leftToRightConversion: (num: number): number => num * 100,
              rightToLeftConversion: (num: number): number => num / 100,
              setState: setLength,
            })
          }
          value={length.meters}
          label="Meter"
          unit="m"
          error={length.error}
        /> */}
        <MetersInput
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateUnitValues({
              e,
              unit: "m",
              units: ["m", "cm"],
              leftToRightConversion: (num) => num * 100,
              rightToLeftConversion: (num) => num / 100,
              setState: setLength,
              setErrors,
              errors,
            })
          }
          value={length.m}
          unit="m"
          label="Meter"
          errors={errors}
        />
        <CentimetersInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            updateUnitValues({
              e,
              unit: "cm",
              units: ["m", "cm"],
              leftToRightConversion: (num) => num * 100,
              rightToLeftConversion: (num) => num / 100,
              setState: setLength,
              setErrors,
              errors,
            });
          }}
          value={length.cm}
          unit="cm"
          label="Centimeter"
          errors={errors}
        />
        {/* <KilogramsInput
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            changeMass(e, "kg", setMass)
          }
          value={mass.kilograms}
          label="Kilogram"
        />
        <GramsInput
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            changeMass(e, "g", setMass)
          }
          value={mass.grams}
          label="Gram"
        />
        <MinutesInput
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            changeTime(e, "min", setTime)
          }
          value={time.minutes}
          label="Minute"
        />
        <SecondsInput
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            changeTime(e, "s", setTime)
          }
          value={time.seconds}
          label="Second"
        /> */}
      </div>
    </div>
  );
}

export default App;
