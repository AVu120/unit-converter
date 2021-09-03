import { useContext } from "react";
import { UnitTypeContext } from "../../App";
import { data } from "../../services/data";
import { updateUnit } from "../../services/unitConversion";
import {
  TChangeEvent,
  TMapOfStrings,
  TSetErrors,
  TSetState,
  TUnit,
  TUnits,
} from "../../types/common";
import styles from "./Input.module.scss";
interface IInputProps {
  onChange: (e: TChangeEvent) => void;
  value: number | string;
  unit: TUnit;
  units: TUnits;
  errors: TMapOfStrings;
  setErrors: TSetErrors;
  setUnitValues: TSetState;
}

const Input = ({
  onChange,
  value,
  unit,
  units,
  errors,
  setErrors,
  setUnitValues,
}: IInputProps) => {
  const { unitType, unitValues } = useContext(UnitTypeContext);
  const currentErrors = Object.entries(errors).filter((_) => _[1]);
  const hasValidInput = !(currentErrors.length && currentErrors[0][0] === unit);
  const errorMessage = !hasValidInput && currentErrors[0][1];
  const unitOptions = Object.entries(data[unitType].unitsToLabels);

  return (
    <div className={styles.input_container}>
      <input
        data-testid="unit-input"
        onChange={onChange}
        value={value}
        className={`${styles.input} ${!hasValidInput && styles.input_error}`}
      />
      <span className={styles.error_message}>{errorMessage}</span>
      <select
        data-testid="unit-selector"
        onChange={(e) =>
          updateUnit({
            e,
            unit,
            units,
            unitType,
            unitValues,
            setUnitValues,
            errors,
            setErrors,
          })
        }
        className={styles.select}
        value={unit}
      >
        {unitOptions.map(([dataUnit, dataLabel]) => (
          <option
            key={`${unitType}_${dataLabel}_option`}
            value={dataUnit}
          >{`${dataLabel}`}</option>
        ))}
      </select>
    </div>
  );
};

export default Input;
