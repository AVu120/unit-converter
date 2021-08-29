import { useState } from "react";
import styles from "./App.module.scss";
import { IMap } from "./types/common";
import Inputs from "./components/inputs/Inputs";

function App() {
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
      <div className={styles.unit_converter_container}>
        <h1 className={styles.title}>Unit Converter</h1>
        <select className={styles.measurement_selector_input}>
          <option>Length</option>
        </select>
        <Inputs
          units={["m", "cm"]}
          labels={["Meter", "Centimeter"]}
          unitValues={unitValues}
          setUnitValues={setUnitValues}
          errors={errors}
          setErrors={setErrors}
          conversionFunctions={[(num) => num * 100, (num) => num / 100]}
        />
        <div>
          <span className={styles.formula_logo}>Formula</span> multiply the
          length value by 100
        </div>
      </div>
    </div>
  );
}

export default App;
