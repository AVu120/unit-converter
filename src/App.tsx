import { ChangeEvent, useState } from "react";
import {
  default as CentimetersInput,
  default as GramsInput,
  default as KilogramsInput,
  default as MetersInput,
  default as MinutesInput,
  default as SecondsInput,
} from "../src/components/input/Input";
import styles from "./App.module.scss";
import {
  changeLength,
  changeMass,
  changeTime,
} from "./services/unitConversion";
import { ILength, IMass, ITime } from "./types/units";

function App() {
  const [length, setLength] = useState<ILength>({ meters: 0, centimeters: 0 });
  const [mass, setMass] = useState<IMass>({ kilograms: 0, grams: 0 });
  const [time, setTime] = useState<ITime>({ minutes: 0, seconds: 0 });

  return (
    <div className={styles.App}>
      <h1>Unit Converter</h1>
      <div className={styles.grid}>
        <MetersInput
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            changeLength(e, "m", setLength)
          }
          value={length.meters}
          label="Meter"
        />
        <CentimetersInput
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            changeLength(e, "cm", setLength)
          }
          value={length.centimeters}
          label="Centimeter"
        />
        <KilogramsInput
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
        />
      </div>
    </div>
  );
}

export default App;
