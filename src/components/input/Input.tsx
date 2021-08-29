import styles from "./Input.module.scss";
import { TMapOfStrings, TChangeEvent } from "../../types/common";

interface IInputProps {
  onChange: (e: TChangeEvent) => void;
  value: number | string;
  label: string;
  unit: string;
  errors: TMapOfStrings;
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
        className={`${styles.input} ${!hasValidInput && styles.input_error}`}
      />
      <span className={styles.error_message}>{errorMessage}</span>
      <select className={styles.select}>
        <option>{label}</option>
      </select>
    </div>
  );
};

export default Input;
