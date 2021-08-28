import { ChangeEvent } from "react";
import styles from "./Input.module.scss";
import { IMap } from "../../types/common";

interface IInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: number | string;
  label: string;
  unit: string;
  errors: IMap<string>;
}

const Input = ({ onChange, value, label, unit, errors }: IInputProps) => {
  const currentErrors = Object.entries(errors).filter((_) => _[1]);
  const hasValidInput = !(currentErrors.length && currentErrors[0][0] === unit);
  const errorMessage = !hasValidInput && currentErrors[0][1];

  return (
    <div className={styles.input}>
      <input
        onChange={onChange}
        value={value}
        className={`${!hasValidInput && styles.error}`}
      />
      <label style={{ display: "flex", justifyContent: "space-between" }}>
        {hasValidInput ? (
          <span>{label}</span>
        ) : (
          <span style={{ color: "red", fontSize: "1rem" }}>{errorMessage}</span>
        )}
      </label>
    </div>
  );
};

export default Input;
