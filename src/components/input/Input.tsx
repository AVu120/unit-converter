import styles from "./Input.module.scss";
import {
  TMapOfStrings,
  TChangeEvent,
  TSetState,
  TSetErrors,
} from "../../types/common";
import data from "../../services/data";
import { useContext } from "react";
import { UnitTypeContext } from "../../App";
import { ChangeEventHandler } from "react";

interface IInputProps {
  onChange: (e: TChangeEvent) => void;
  value: number | string;
  unit: string;
  units: [string, string];
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

  const updateUnit: ChangeEventHandler<HTMLSelectElement> = (e) => {
    let updatedUnitValues;
    let updatedErrors;
    const hasSwappedUnits =
      (unit === units[0] && e.target.value === units[1]) ||
      (unit === units[1] && e.target.value === units[0]);

    // When changing unit of 1st input.
    if (unit === units[0]) {
      updatedUnitValues = {
        [e.target.value]: `${Object.values(unitValues)[0]}`,
        [Object.keys(unitValues)[hasSwappedUnits ? 0 : 1]]: `${
          Object.values(unitValues)[1]
        }`,
      };
      // When changing unit of 2nd input.
    } else {
      updatedUnitValues = {
        [Object.keys(unitValues)[hasSwappedUnits ? 1 : 0]]: `${
          Object.values(unitValues)[0]
        }`,
        [e.target.value]: `${Object.values(unitValues)[1]}`,
      };
    }

    if (hasSwappedUnits && Object.values(errors).some((error) => error)) {
      updatedErrors = {
        [Object.keys(errors)[0]]: Object.values(errors)[1],
        [Object.keys(errors)[1]]: Object.values(errors)[0],
      };
      setErrors(updatedErrors);
    }
    setUnitValues(updatedUnitValues);
  };

  return (
    <div className={styles.input_container}>
      <input
        onChange={onChange}
        value={value}
        className={`${styles.input} ${!hasValidInput && styles.input_error}`}
      />
      <span className={styles.error_message}>{errorMessage}</span>
      <select
        onChange={updateUnit}
        className={styles.select}
        value={`${data[unitType].unitsToLabels[unit]}`}
      >
        <option style={{ display: "none" }}>
          {`${data[unitType].unitsToLabels[unit]}`}
        </option>
        {unitOptions.map((option) => (
          <option
            key={`${unitType}_${option[1]}_option`}
            value={option[0]}
          >{`${option[1]}`}</option>
        ))}
      </select>
    </div>
  );
};

export default Input;
