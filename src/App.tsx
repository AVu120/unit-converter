import { useState, ChangeEvent } from "react";
import styles from "./App.module.scss";

interface ILength {
  meters: number | "";
  centimeters: number | "";
}

interface IMass {
  kilograms: number | "";
  grams: number | "";
}

function App() {
  const [length, setLength] = useState<ILength>({ meters: 0, centimeters: 0 });
  const [mass, setMass] = useState<IMass>({ kilograms: 0, grams: 0 });

  const changeLength = (
    e: ChangeEvent<HTMLInputElement>,
    unit: "m" | "cm"
  ): void => {
    // if a number or "".
    if (!isNaN(Number(e.target.value))) {
      if (e.target.value === "")
        return setLength({ meters: "", centimeters: "" });
      const value = Number(e.target.value);
      if (unit === "m")
        return setLength({ meters: value, centimeters: value * 100 });
      setLength({ meters: value / 100, centimeters: value });
    }
  };

  const changeMass = (
    e: ChangeEvent<HTMLInputElement>,
    unit: "kg" | "g"
  ): void => {
    // if a number or "".
    if (!isNaN(Number(e.target.value))) {
      if (e.target.value === "") return setMass({ kilograms: "", grams: "" });
      const value = Number(e.target.value);
      if (unit === "kg")
        return setMass({ kilograms: value, grams: value * 1000 });
      setMass({ kilograms: value / 1000, grams: value });
    }
  };
  return (
    <div className={styles.App}>
      <h1>Unit Converter</h1>
      <div className={styles.grid}>
        <div className={styles.input}>
          <input onChange={(e) => changeLength(e, "m")} value={length.meters} />
          <label>Meter</label>
        </div>
        <div className={styles.input}>
          <input
            onChange={(e) => changeLength(e, "cm")}
            value={length.centimeters}
          />
          <label>Centimeter</label>
        </div>
        <div className={styles.input}>
          <input onChange={(e) => changeMass(e, "kg")} value={mass.kilograms} />
          <label>Kilogram</label>
        </div>
        <div className={styles.input}>
          <input onChange={(e) => changeMass(e, "g")} value={mass.grams} />
          <label>Gram</label>
        </div>
      </div>
    </div>
  );
}

export default App;
