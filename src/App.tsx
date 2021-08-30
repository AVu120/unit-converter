import { useState, useEffect, createContext } from "react";
import styles from "./App.module.scss";
import { IMap } from "./types/common";
import Inputs from "./components/inputs/Inputs";
import data from "../src/services/data";
import { getConversionFunctions } from "./services/unitConversion";

export const UnitTypeContext = createContext<any>(null);

function App() {
  const [unitType, setUnitType] = useState("Length");
  const [defaultUnit1, defaultUnit2] = [
    Object.keys(data[unitType].unitsToLabels)[0],
    Object.keys(data[unitType].unitsToLabels)[1],
  ];
  const [unitValues, setUnitValues] = useState<IMap<string | number>>({
    [defaultUnit1]: 0,
    [defaultUnit2]: 0,
  });
  const [unit1, unit2] = [
    Object.keys(unitValues)[0],
    Object.keys(unitValues)[1],
  ];

  const [errors, setErrors] = useState<IMap<string>>({
    [defaultUnit1]: "",
    [defaultUnit2]: "",
  });

  useEffect(() => {
    setUnitValues({ [defaultUnit1]: 0, [defaultUnit2]: 0 });
    setErrors({ [defaultUnit1]: "", [defaultUnit2]: "" });
  }, [unitType]);

  return (
    <UnitTypeContext.Provider value={{ unitValues, unitType }}>
      <div className={styles.App}>
        <div className={styles.unit_converter_container}>
          <h1 className={styles.title}>Unit Converter</h1>
          <select
            onChange={(e) => {
              setUnitType(e.target.value);
            }}
            className={styles.measurement_selector_input}
          >
            {Object.keys(data).map((unitTypeValue) => (
              <option key={`${unitTypeValue}_option`} value={unitTypeValue}>
                {unitTypeValue}
              </option>
            ))}
          </select>
          <Inputs
            units={[unit1, unit2]}
            unitValues={unitValues}
            setUnitValues={setUnitValues}
            errors={errors}
            setErrors={setErrors}
            conversionFunctions={getConversionFunctions(unitType, unit1, unit2)}
          />
          <div>
            <span className={styles.formula_logo}>Formula</span> multiply the
            length value by 100
          </div>
        </div>
      </div>
    </UnitTypeContext.Provider>
  );
}

export default App;
