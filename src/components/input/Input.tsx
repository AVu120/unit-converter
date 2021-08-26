import { ChangeEvent } from "react";
import styles from "./Input.module.scss";

interface IInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: number | string;
  label: string;
}

const Input = ({ onChange, value, label }: IInputProps) => {
  return (
    <div className={styles.input}>
      <input onChange={onChange} value={value} />
      <label>{label}</label>
    </div>
  );
};

export default Input;
