import { updateUnitValues } from "../../services/unitConversion";
import {
  TChangeEvent,
  TMapOfStringOrNumbers,
  TMapOfStrings,
  TSetErrors,
  TSetState,
  TUnits,
} from "../../types/common";
import { default as Unit1Input, default as Unit2Input } from "../input/Input";
import styles from "./Inputs.module.scss";

interface IInputsProps {
  units: TUnits;
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
