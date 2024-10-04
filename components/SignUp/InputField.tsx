import { ChangeEvent } from 'react';
import styles from './SignUp.module.css';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function InputField({ type, placeholder, value, onChange, required }: InputFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required={required}
    />
  );
}