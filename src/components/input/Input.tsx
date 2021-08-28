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
    <div className={styles.input_container}>
      <input
        onChange={onChange}
        value={value}
        className={`${!hasValidInput && styles.input_error}`}
        style={{ fontSize: "1rem" }}
      />
      <span className={styles.error_message}>{errorMessage}</span>
      <select className={styles.select}>
        <option>{label}</option>
      </select>
    </div>
  );
};

export default Input;
