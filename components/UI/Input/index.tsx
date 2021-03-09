import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './Input.module.css';

interface InputClasses {
  container: string;
  label?: string;
  inputElement?: string;
  caption?: string;
}

interface Props {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string;
  label: string;
  placeholder?: string;
  classes?: InputClasses;
  type?: 'text' | 'password';
}

const Input = (props: Props) => {
  const {
    value,
    error,
    onBlur,
    label,
    onChange,
    classes,
    placeholder,
    type,
  } = props;
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [classVariant, setClassVariant] = useState('');

  useEffect(() => {
    if (isOnFocus) {
      setClassVariant(styles.Selected);
    } else if (error) {
      setClassVariant(styles.Error);
    } else if (value.length) {
      setClassVariant(styles.Filled);
    } else {
      setClassVariant('');
    }
  }, [value, error, isOnFocus]);

  const actionOnBlur = () => {
    setIsOnFocus(false);
    onBlur();
  };

  const renderLabel = () => (
    <h3 className={`${styles.Label} ${classes.label ?? ''}`}>{label}</h3>
  );

  const renderInput = () => (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onBlur={actionOnBlur}
      onFocus={() => setIsOnFocus(true)}
      placeholder={placeholder}
      autoComplete="off"
      className={`${styles.Input} ${classVariant} ${
        classes.inputElement ?? ''
      }`}
    />
  );

  const renderCaption = () => {
    if (error) {
      return (
        <h6
          className={`${styles.ErrorCaption} ${classes.caption ?? ''}`}
        >
          {error}
        </h6>
      );
    }
    return null;
  };

  return (
    <div className={`${styles.Container} ${classes.container}`}>
      {renderLabel()}
      {renderInput()}
      {renderCaption()}
    </div>
  );
};

Input.defaultProps = {
  onBlur: () => {},
  error: '',
  classes: {},
  placeholder: '',
  type: 'text',
};

export default Input;
