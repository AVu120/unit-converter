import styles from "./Inputs.module.scss";
import { default as Unit1Input, default as Unit2Input } from "../input/Input";
import { updateUnitValues } from "../../services/unitConversion";
import {
  TSetState,
  TMapOfStrings,
  TMapOfStringOrNumbers,
  TSetErrors,
  TChangeEvent,
} from "../../types/common";

interface IInputsProps {
  units: [string, string];
  unitValues: TMapOfStringOrNumbers;
  setUnitValues: TSetState;
  errors: TMapOfStrings;
  setErrors: TSetErrors;
  conversionFunctions: [(num: number) => number, (num: number) => number];
}

const Inputs = ({
  units,
  unitValues,
  setUnitValues,
  errors,
  setErrors,
  conversionFunctions,
}: IInputsProps) => {
  return (
    <div className={styles.inputs_grid}>
      <Unit1Input
        onChange={(e: TChangeEvent) =>
          updateUnitValues({
            e,
            unit: units[0],
            units,
            leftToRightConversion: conversionFunctions[0],
            rightToLeftConversion: conversionFunctions[1],
            setState: setUnitValues,
            setErrors,
            errors,
          })
        }
        value={Object.values(unitValues)[0]}
        unit={units[0]}
        units={units}
        errors={errors}
        setErrors={setErrors}
        setUnitValues={setUnitValues}
      />
      <span className={styles.equalSign}>=</span>
      <Unit2Input
        onChange={(e: TChangeEvent) => {
          updateUnitValues({
            e,
            unit: units[1],
            units,
            leftToRightConversion: conversionFunctions[0],
            rightToLeftConversion: conversionFunctions[1],
            setState: setUnitValues,
            setErrors,
            errors,
          });
        }}
        value={Object.values(unitValues)[1]}
        unit={units[1]}
        units={units}
        errors={errors}
        setErrors={setErrors}
        setUnitValues={setUnitValues}
      />
    </div>
  );
};

export default Inputs;
