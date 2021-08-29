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
  labels: [string, string];
  unitValues: TMapOfStringOrNumbers;
  setUnitValues: TSetState;
  errors: TMapOfStrings;
  setErrors: TSetErrors;
  conversionFunctions: [(num: number) => number, (num: number) => number];
}

const Inputs = ({
  units,
  labels,
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
        label={labels[0]}
        errors={errors}
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
        label={labels[1]}
        errors={errors}
      />
    </div>
  );
};

export default Inputs;
